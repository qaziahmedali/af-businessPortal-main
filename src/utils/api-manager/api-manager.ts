import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { AbhiResponse, LoginRes, SystemConfigRes } from './responses'
import { APIList, Initiator, ServiceConfigurations } from './types'

export interface FetchParams<Params extends Record<string, any>, queryParams> {
  name: string
  params?: Params
  queryParams?: queryParams
  config?: AxiosRequestConfig
  pathVariables?: Record<string, string>
}

export interface ApiManagerOptions {
  readonly tokenSetter: (value: string) => void
  readonly tokenGetter: () => string
}

export type RequestInterceptor = (value: AxiosRequestConfig) => AxiosRequestConfig
export type ResponseInterceptor = (value: AxiosResponse) => AxiosResponse

export class ApiManage {
  private apiBank: APIList | null = null

  private lastLogin: Date | null = null

  systemConfig: ServiceConfigurations | null = null

  axiosInstance = axios.create({})

  private readonly requestInterceptors: RequestInterceptor[] = []
  private readonly responseInterceptors: ResponseInterceptor[] = []
  private readonly onLoginListeners: (() => void)[] = []

  get isTokenExpired() {
    const TwentyFourHoursTicks = 24 * 60 * 60 * 1000

    if (this.lastLogin == null) return true

    const expireDate = this.lastLogin.getTime() + TwentyFourHoursTicks

    return expireDate < new Date().getTime()
  }

  set token(value: string) {
    this.options.tokenSetter(value)
  }

  get token() {
    return this.options.tokenGetter()
  }

  get isLoggedIn() {
    return Boolean(this.apiBank) && Boolean(this.systemConfig)
  }

  getLastLogin() {
    return this.lastLogin
  }
  
  setLastLogin(value: Date) {
    this.lastLogin = value
    localStorage.setItem('@@API_MANAGER:LAST_LOGIN@@', value.toString())
  }

  onLogin(listeners: () => void) {
    this.onLoginListeners.push(listeners)
  }

  constructor(public IndexUrl: string, public initiator: Initiator, private options: ApiManagerOptions) {
    this.axiosInstance.interceptors.request.use(this.requestInterceptor)
    this.axiosInstance.interceptors.response.use(this.responseInterceptor)

    this.lastLogin = localStorage.getItem('@@API_MANAGER:LAST_LOGIN@@')
      ? new Date(String(localStorage.getItem('@@API_MANAGER:LAST_LOGIN@@')))
      : null
  }

  public overrideTokenMethod = (payload: ApiManagerOptions) => {
    this.options = payload
  }

  public addRequestInterceptor = (requestInterceptor: RequestInterceptor) =>
    this.requestInterceptors.push(requestInterceptor)

  public addResponseInterceptor = (responseInterceptor: ResponseInterceptor) =>
    this.responseInterceptors.push(responseInterceptor)

  public removeRequestInterceptor = (Interceptor: RequestInterceptor) => {
    let idx = this.requestInterceptors.indexOf(Interceptor)
    if (idx === -1) return false

    this.requestInterceptors.splice(idx, 1)
    return true
  }

  public removeResponseInterceptor = (Interceptor: ResponseInterceptor) => {
    let idx = this.responseInterceptors.indexOf(Interceptor)
    if (idx === -1) return false

    this.responseInterceptors.splice(idx, 1)
    return true
  }

  private requestInterceptor = (value: AxiosRequestConfig) => {
    value.headers['Authorization'] = `Bearer ${this.token}`
    this.requestInterceptors.forEach((Interceptor) => Interceptor(value))

    return value
  }

  private responseInterceptor = (value: AxiosResponse) => {
    this.responseInterceptors.forEach((Interceptor) => Interceptor(value))

    return value
  }

  fetchConfig = async () => {
    if (!this.token) throw new Error('token was not found')

    const {
      data: {
        data: { result }
      }
    } = await this.axiosInstance.get<AbhiResponse<SystemConfigRes>>(
      `${this.IndexUrl}/system/settings/${this.initiator}`
    )

    this.systemConfig = result
    this.apiBank = { ...this.systemConfig.jsonConfig.apis.private, ...this.systemConfig.jsonConfig.apis.public }

    this.onLoginListeners.forEach((listener) => listener())
  }

  login = async (userName: string, password: string) => {
    const res = await this.axiosInstance.post<AbhiResponse<LoginRes>>(`${this.IndexUrl}/auth/login`, {
      username: userName,
      password,
      initiator: this.initiator
    })

    this.token = res.data.data.token

    await this.fetchConfig()

    this.lastLogin = new Date()

    localStorage.setItem('@@API_MANAGER:LAST_LOGIN@@', this.lastLogin.toISOString())

    this.onLoginListeners.forEach((listener) => listener())

    return res
  }

  async fetch<
    Response extends object,
    Params extends Record<string, any> = Record<string, any>,
    queryParams extends Record<string, any> = Record<string, any>
  >({
    name,
    config,
    params,
    queryParams,
    pathVariables
  }: FetchParams<Params, queryParams>): Promise<AxiosResponse<AbhiResponse<Response>>> {
    if (!this.isLoggedIn) {
      throw new Error('Please Log in first before using any api.')
    }

    if (this.isTokenExpired) {
      localStorage.clear()
      window.location.reload()
      throw new Error('You token is expired please login again.')
    }

    const apiInfo = this.apiBank?.[name]

    if (apiInfo == null) {
      throw new Error(`unable to find "${name}" named end point.`)
    }

    let url = apiInfo.path

    for (const [param, value] of Object.entries(pathVariables ?? {})) {
      url = url.replace(
        new RegExp(`{${param}}`),
        Array.isArray(value) ? encodeURI(value as any) : encodeURIComponent(value)
      )
    }

    const queryParamsEntries = Object.entries(queryParams ?? {})

    if (queryParamsEntries.length > 0) {
      url += '?'
      for (const [param, value] of queryParamsEntries) {
        url += `${param}=${Array.isArray(value) ? encodeURI(value as any) : encodeURIComponent(value)}&`
      }
    }

    return this.axiosInstance.request<AbhiResponse<Response>>({
      url: url,
      params: params,
      method: apiInfo.method,
      ...config
    })
  }
}

/////////////// User File

export const TOKEN_ID = '@@API_MANAGER:USER_API_TOKEN@@'

export const destroyToken = () => localStorage.removeItem(TOKEN_ID)
export const tokenSetter = (token: string) => localStorage.setItem(TOKEN_ID, token)
export const tokenGetter = () => {
  const token = localStorage.getItem(TOKEN_ID)

  return token ?? ''
}

export const getApiUrlFromEnv = () => {
  if (import.meta.env.VITE_API_URL != null) {
    return import.meta.env.VITE_API_URL
  } else {
    return process.env.STAGE_API_URL
  }
}

export const apiManager = new ApiManage(String(getApiUrlFromEnv()), 'vendor_web', {
  tokenSetter,
  tokenGetter
})

apiManager.axiosInstance.interceptors.response.use(
  (value) => {
    return value
  },
  (val) => {

    if (!val.response) {
      return Promise.reject(val)
    }
    if (val.response.status === 401) {
      localStorage.clear()
      window.location.href = '/'
      return
    }
    return Promise.reject(val)
  }
)
