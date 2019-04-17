import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import auth from '../utils/auth';
import Login from '../views/Login';
import AuthenticatedRoute from './AuthRoute';
import LandingPage from '../views/LandingPage';

export default function RoutesListing() {
  const isLoggedIn = auth.isAuthenticated();
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" exact component={Login} />
        </Switch>
        <AuthenticatedRoute
          exact
          path="/dashboard"
          component={LandingPage}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </Router>
  );
}