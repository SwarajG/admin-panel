import {
  baseUrl,
  method
} from '../utils/enums';

export const loginRequest = user => fetch(`${baseUrl}/agent/login`, {
  method: method.POST,
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(user)
});