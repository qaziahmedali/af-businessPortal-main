import React, { useEffect, useReducer, ChangeEvent, FormEvent } from 'react'
import { useHistory } from 'react-router'
import { useEasyActions } from '../../../store/hooks'
import { validateEmail, validatePassword, validatePhoneNumber } from '../../../utils/validations'

import { reducer, initialState } from './reducer'
import LoginWrapper from './login-wrapper'
import LoginForm from './login-form'

import { MixpanelComponent } from '../../../utils/mixpanel'
import { mixpanelEvents } from '../../../constants/mixpanel'

const Login: React.FC = () => {
  const history = useHistory()
  const [state, dispatch] = useReducer(reducer, initialState)
  const { login } = useEasyActions(({ user }) => user)

  const handleClickShowPassword = () => dispatch({ type: 'SHOW_PWD', payload: !state.showPassword })

  const handleClickRememberMe = () => dispatch({ type: 'REMEMBER_ME', payload: !state.rememberMe })

  const handleInputUsername = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: 'SET_UNAME', payload: e.target.value })

  const handleInputPassword = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: 'SET_PWD', payload: e.target.value })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const { username: originUsername, password, rememberMe } = state
    const username = originUsername?.trim() || ''
    const isValidPassword = validatePassword(password)
    const isValidUsername = validateEmail(username) || validatePhoneNumber(username)

    // update input errors
    dispatch({ type: 'SET_PWD_ERROR', payload: !isValidPassword })
    dispatch({ type: 'SET_UNAME_ERROR', payload: !isValidUsername })

    // break if any input error
    if (!isValidPassword || !isValidUsername) return

    try {
      await login({ username, password, rememberMe })
      MixpanelComponent(mixpanelEvents.LoginScreen_Success)
      history.replace('/vendors')
    } catch (error: any) {
      MixpanelComponent(mixpanelEvents.LoginScreen_Failed)

      console.log('login error => ', error)

      dispatch({
        type: 'SET_ERROR_MSG',
        payload: error?.response?.data?.message || 'Something was wrong, please try again later!'
      })
    }
  }

  useEffect(() => {
    MixpanelComponent(mixpanelEvents.LoginScreen_Landed)
  }, [])

  return (
    <LoginWrapper errorMessage={state.errorMessage}>
      <LoginForm
        {...state}
        onSubmit={handleSubmit}
        onChangePassword={handleInputPassword}
        onChangeUsername={handleInputUsername}
        onToggleRememberMe={handleClickRememberMe}
        onToggleShowPassword={handleClickShowPassword}
        isInvalidUsername={!validateEmail(state.username)}
        isInvalidPassword={!validatePassword(state.password)}
      />
    </LoginWrapper>
  )
}

export default Login
