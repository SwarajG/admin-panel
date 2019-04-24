import React from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';

export default function AuthenticatedRoute(superProps) {
  const { component: Component, isLoggedIn, ...rest } = superProps;
  return (
    <Route {...rest} render={(props) => {
      return isLoggedIn
        ? <Component {...superProps} {...props} />
        : <Redirect to='/login' /* to={{ pathname: '/login', state: { from: props.location } }} */ />
    }} />
  );
}