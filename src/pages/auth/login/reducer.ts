import { Action } from '../../../types'
const username = localStorage.getItem('username') || ''

export const initialState = {
  username: username,
  password: '',
  rememberMe: username ? true : false,
  showPassword: false,

  isInvalidUsername: false,
  isInvalidPassword: false,
  errorMessage: ''
}

export const reducer = (state: typeof initialState, action: Action) => {
  const { type, payload } = action

  switch (type) {
    case 'SET_UNAME':
      return {
        ...state,
        username: payload,
        isInvalidUsername: false,
        errorMessage: ''
      }

    case 'SET_PWD':
      return {
        ...state,
        password: payload,
        isInvalidPassword: false,
        errorMessage: ''
      }

    case 'REMEMBER_ME':
      return { ...state, rememberMe: payload }

    case 'SHOW_PWD':
      return { ...state, showPassword: payload }

    case 'SET_UNAME_ERROR':
      return { ...state, isInvalidPassword: payload }

    case 'SET_PWD_ERROR':
      return { ...state, isInvalidPassword: payload }

    case 'SET_ERROR_MSG':
      return { ...state, errorMessage: payload }

    default:
      return state
  }
}
