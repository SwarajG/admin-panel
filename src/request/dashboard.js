import {
  baseUrl,
  method,
  gameStatus
} from '../utils/enums';
import auth from '../utils/auth';
import { cookiesList } from '../utils/auth/cookieList';
import { getCookieFromKey } from '../utils/auth/urlParser';
const token = getCookieFromKey(cookiesList.token);

export const dashboardRequest = () => fetch(`${baseUrl}/agent/dashboard`, {
  method: method.POST,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ agentId: auth.getAgentId(), token })
});

export const updateMessage = (agentId, message) => fetch(`${baseUrl}/agent/updateMsg`, {
  method: method.POST,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ agentId: auth.getAgentId(), adSMassage: message, token })
});

export const updateGameStatus = (status) => fetch(`${baseUrl}/startOrStopGame?tableStatus=${status}`, {
  method: method.POST,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ token })
});