import {
  baseUrl,
  method
} from '../utils/enums';
import { cookiesList } from '../utils/auth/cookieList';
import { getCookieFromKey } from '../utils/auth/urlParser';
const token = getCookieFromKey(cookiesList.token);

export const dashboardRequest = agentId => fetch(`${baseUrl}/agent/dashboard`, {
  method: method.POST,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ agentId, token })
});

export const updateMessage = (agentId, message) => fetch(`${baseUrl}/agent/updateMsg`, {
  method: method.POST,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ agentId, adSMassage: message, token })
});