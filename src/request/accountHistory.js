import {
  baseUrl,
  method
} from '../utils/enums';
import { cookiesList } from '../utils/auth/cookieList';
import { getCookieFromKey } from '../utils/auth/urlParser';
const token = getCookieFromKey(cookiesList.token);

export const getAccountHistory = (data) => fetch(`${baseUrl}/accountHistory`, {
  method: method.POST,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    ...data,
    token
  })
});