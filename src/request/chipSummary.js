import {
  baseUrl,
  method
} from '../utils/enums';
import auth from '../utils/auth';
import { cookiesList } from '../utils/auth/cookieList';
import { getCookieFromKey } from '../utils/auth/urlParser';
const token = getCookieFromKey(cookiesList.token);

export const getChipSummary = () => fetch(`${baseUrl}/getChipSummary`, {
  method: method.POST,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ agentId: auth.getAgentId(), role: auth.getAgentRole(), token })
});