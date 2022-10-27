import AccountCreated from '../pages/account-registration/account-created'
import BusinessFilesUpload from '../pages/account-registration/business-files-upload'
import BusinessType from '../pages/account-registration/business-type'
import ConfirmYourDetails from '../pages/account-registration/confirm-your-details'
import OfficialDetails from '../pages/account-registration/official-details'
import PersonalDetails from '../pages/account-registration/personal-details'
import Verification from '../pages/account-registration/verification'
import AddVendors from '../pages/dashboard-pages/vendors/add-vendors'
import Dashboard from '../pages/dashboard-pages/dashboard'
import Vendors from '../pages/dashboard-pages/vendors/vendors'
import VendorsListing from '../pages/dashboard-pages/vendors/vendors-listing'
import Group from '../pages/dashboard-pages/groups/group'
import RequestSummary from '../pages/dashboard-pages/request-summary'
import Statement from '../pages/dashboard-pages/statement'
import HomePage from '../pages/home/home-page'
import NotFoundPage from '../pages/not-found/not-found-page'
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import AddGroup from '../pages/dashboard-pages/groups/add-group'
import AddVendorsToGroup from '../pages/dashboard-pages/groups/add-vendors-to-group'
import SingleGroup from '../pages/dashboard-pages/groups/single-group'
import EditVendorProfile from '../pages/dashboard-pages/vendors/edit-vendor-profile'
import MainSettings from '../pages/dashboard-pages/settings/main-settings'
import MyProfile from '../pages/dashboard-pages/settings/my-profile'
import BusinessProfile from '../pages/dashboard-pages/settings/business-profile'
import BadgeSettings from '../pages/dashboard-pages/settings/badge-settings'
import PortalRoles from '../pages/dashboard-pages/settings/portal-roles'
import FiscalYear from '../pages/dashboard-pages/settings/fiscal-year-month'
import SetPayroll from '../pages/dashboard-pages/settings/set-payroll'
import Logout from '../pages/logout'

function AuthApp() {
  return (
    <Switch>
      <Redirect exact path="/" to="/vendors" />
      {/* Account Registration Routes */}
      <Route exact path="/personalDetails" component={PersonalDetails} />
      <Route exact path="/officialDetails" component={OfficialDetails} />
      <Route exact path="/confirmYourDetails" component={ConfirmYourDetails} />
      <Route exact path="/verification" component={Verification} />
      <Route exact path="/accountCreated" component={AccountCreated} />
      <Route exact path="/businessType" component={BusinessType} />
      <Route exact path="/businessFilesUpload" component={BusinessFilesUpload} />
      {/* Dashboard Routes */}
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/vendors" component={Vendors} />
      <Route exact path="/addVendor" component={AddVendors} />
      <Route exact path="/vendorsListing" component={VendorsListing} />
      <Route exact path="/requestSummary" component={RequestSummary} />
      <Route exact path="/statement" component={Statement} />
      <Route exact path="/group" component={Group} />
      <Route exact path="/addGroup" component={AddGroup} />
      <Route exact path="/addVendorToGroup" component={AddVendorsToGroup} />
      <Route exact path="/singleGroup" component={SingleGroup} />
      <Route exact path="/editVendor/:id" component={EditVendorProfile} />

      {/* settings pages */}
      <Route exact path="/settings" component={MainSettings} />
      <Route exact path="/myProfile" component={MyProfile} />
      <Route exact path="/businessProfile" component={BusinessProfile} />
      <Route exact path="/badgeSettings" component={BadgeSettings} />
      <Route exact path="/portalRoles" component={PortalRoles} />
      <Route exact path="/fiscalYear" component={FiscalYear} />
      <Route exact path="/setPayroll" component={SetPayroll} />
      {/* Logout */}
      <Route exact path="/logout" component={Logout} />

      <Route component={NotFoundPage} />
    </Switch>
  )
}

export default AuthApp
