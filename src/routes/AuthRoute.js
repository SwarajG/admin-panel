import React from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';

export default function AuthenticatedRoute(props) {
  const { component: Component, isLoggedIn, ...rest } = props;
  return (
    <Route {...rest} render={() => {
      return isLoggedIn
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    }} />
  );
}