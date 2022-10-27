import Login from '../pages/auth/login';
import ForgotPassword from '../pages/auth/forgot-password';
import ReCaptcha from '../pages/auth/re-captcha';
import Register from '../pages/auth/register';
import NotFoundPage from '../pages/not-found/not-found-page';
import React from 'react';
import { Route, Switch } from 'react-router';

function PublicApp() {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/recaptcha" component={ReCaptcha} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route component={NotFoundPage} />
    </Switch>
  )
}

export default PublicApp
