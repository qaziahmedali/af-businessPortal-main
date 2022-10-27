import { mixpanelEvents } from '@/constants/mixpanel'
import mixpanel from 'mixpanel-browser'

export const MixpanelComponent = (event: mixpanelEvents): void => {
  const MIX_PANEL_KEY = import.meta.env.VITE_MIX_PANEL_KEY || process.env.STAGE_MIX_PANEL_KEY

  mixpanel.init(MIX_PANEL_KEY as string, { debug: true })

  const USER = JSON.parse(localStorage.getItem('USER') || '{}')

  if (USER) {
    const {
      officialEmail,
      person,
      officialPhone,
      selectedBankAccount,
      employeesBadge,
      dateOfJoining,
      department,
      designation,
      organization
    } = USER

    const userObj = {
      Email: officialEmail?.email,
      Phone: officialPhone?.phoneNo,
      ['Account Title']: selectedBankAccount?.accountTitle,
      Badge: employeesBadge,
      Bank: selectedBankAccount?.bank.bankName,
      CNIC: person?.cnic,
      ['Date Of Joining']: dateOfJoining,
      Department: department?.name,
      Designation: designation?.designation,
      ['First Name']: person?.firstName,
      Name: `${person?.firstName} ${person?.lastName}`,
      Organization: organization?.name
    }

    mixpanel.identify(userObj.CNIC)

    mixpanel.people.set({
      ...userObj,
      $email: userObj?.Email,
      $first_name: userObj['First Name']
    })

    return mixpanel.track(event, { ...userObj })
  }

  return mixpanel.track(event)
}
