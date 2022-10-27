import { action, thunk } from 'easy-peasy'
import { IFetchUserAPIResult, IRole, IUser, IUserData } from '../types/store-types'
import { apiManager } from '../utils/api-manager'
import { store } from '.'

const user: IUser = {
  loggedIn: false,
  me: JSON.parse(localStorage.getItem('USER') || '{}'),
  token: '',
  organizationManagementRole: '',


  setLoggedIn: action((state, payload) => {
    state.loggedIn = payload
  }),

  setToken: action((state, payload) => {
    state.token = payload
  }),

  setRole: action((state, payload) => {
    state.organizationManagementRole = payload?.organizationManagementRole
  }),
  
  setUserData: action((state, payload) => {
    state.me = payload
    state.loggedIn = true
    localStorage.setItem('USER', JSON.stringify(payload).replace(/"\s+|\s+"/g, '"'))
  }),

  logout: action((state) => {
    // var darkMode = window.localStorage.getItem('darkMode') || ''
    // var themeMode = window.localStorage.getItem('chakra-ui-color-mode') || ''
    // localStorage.setItem('darkMode', darkMode)
    // localStorage.setItem('chakra-ui-color-mode', themeMode)
    var userName = window.localStorage.getItem('username') || ''
    localStorage.clear()
    localStorage.setItem('username', userName)
    state.loggedIn = false
  }),

  login: thunk(async (_, { username, password, rememberMe }, { getStoreActions }) => {
    const {
      loader: { setisAppLoading },
      user: { setUserData, setToken, setLoggedIn, setRole }
    } = getStoreActions()

    setisAppLoading(true)
    try {
      if (rememberMe) {
        localStorage.setItem('username', username)
      } else {
        localStorage.removeItem('username')
      }
      apiManager.overrideTokenMethod({
        tokenGetter: () => store.getState().user.token,
        tokenSetter: (token: string) => setToken(token)
      })

      const { data } = await apiManager.login(username, password)
      const dataRole = await apiManager.fetch<IRole>({
        name: 'GetOrganizationManagerRole',
        pathVariables: {
          employeeId: data?.data?.data?.employee.id,
          organizationId: data?.data?.data?.employee.organization.id
        }
      })

      setRole(dataRole.data.data || {})
      setUserData(data.data?.data?.employee || {})
      setLoggedIn(apiManager.isLoggedIn)

      return data
    } finally {
      setisAppLoading(false)
    }
  }),

  fetchMe: thunk(async ({ setUserData, setRole }, _, { getStoreActions }) => {
    const {
      loader: { setisAppLoading }
    } = getStoreActions()
    setisAppLoading(true);
    try {
      const {
        data: { data }
      } = await apiManager.fetch<IFetchUserAPIResult>({
        name: 'FetchUserProfile',
        queryParams: {
          initiator: 'vendor_web'
        }
      })

      const dataRole = await apiManager.fetch<IRole>({
        name: 'GetOrganizationManagerRole',
        pathVariables: {
          employeeId: data?.employee.id,
          organizationId: data?.employee.organization.id
        }
      })

      setUserData(data?.employee || {})
      setRole(dataRole.data.data || {})
    } finally {
      setisAppLoading(false)
    }
  })
}

export default user
