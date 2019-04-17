import React from 'react';
import auth from '../utils/auth';
import LandingPage from './LandingPage';
import Login from './Login';

export default function Main() {
  if (auth.isAuthenticated) {
    return <LandingPage />
  }
  return <Login />
}