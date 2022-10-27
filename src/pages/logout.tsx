import React from 'react'
import { useHistory } from 'react-router'
import { useEasyActions } from '../store/hooks'
import { MixpanelComponent } from '../utils/mixpanel'
import { mixpanelEvents } from '../constants/mixpanel'
import { apiManager } from '../utils/api-manager/'

export interface LogoutProps {}

const Logout: React.FC<LogoutProps> = (props) => {
  const { logout } = useEasyActions((actions) => actions.user)
  const history = useHistory()
  React.useEffect(() => {
    const getApiLogout = async () => {
      await apiManager.fetch({
        name: 'AuthLogout'
      })
      logout()

      MixpanelComponent(mixpanelEvents.Logout)

      history.push('/login')
    }
    getApiLogout()
  }, [])
  return (
    <div>
      <p>logging out</p>
    </div>
  )
}

export default Logout
