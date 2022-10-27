import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { useEasyActions, useEasyState } from '../store/hooks'
import { apiManager } from '../utils/api-manager'

import LoadingComponent from '../components/common/loading-component'
import PublicApp from './public'
import AuthApp from './auth'

import '../assets/css/main.css'

function App() {
  const history = useHistory()
  const [initialApp, setInitialApp] = useState(true)

  const { isAppLoading, loadingBackgroundColor } = useEasyState((state) => state.loader)
  const { loggedIn } = useEasyState((state) => state.user)
  const { setToken, logout, setUserData, fetchMe } = useEasyActions((state) => state.user)
  const queryParams = new URLSearchParams(window.location.search)
	const urlQueryToken = queryParams.get('token')

  useEffect(() => {
    window.localStorage.setItem('chakra-ui-color-mode', 'dark')
    if (urlQueryToken) {
      localStorage.removeItem("USER")
      setToken(urlQueryToken)
      apiManager.token = urlQueryToken
      apiManager.setLastLogin(new Date())
      queryParams.delete('token')
    }
    apiManager
      .fetchConfig()
      .then(() => {
        const user = JSON.parse(localStorage.getItem('USER') || '{}')
        setUserData(user)
        return urlQueryToken ? fetchMe() : null;
      })
      .catch((err) => {
        logout()
        history.push('/login')
      })
      .finally(() => setInitialApp(false))
  }, [])

  if (initialApp) return <LoadingComponent loadingBackgroundColor={loadingBackgroundColor} />

  return (
    <>
      {isAppLoading && <LoadingComponent />}
      {!loggedIn ? <PublicApp /> : <AuthApp />}
    </>
  )
}

export default App
