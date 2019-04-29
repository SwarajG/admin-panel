import {
  baseUrl,
  method
} from '../utils/enums';
import { cookiesList } from '../utils/auth/cookieList';
import { getCookieFromKey } from '../utils/auth/urlParser';
const token = getCookieFromKey(cookiesList.token);

export const changePaternship = (role, userName, changePercent) => fetch(`${baseUrl}/user/changePartnership`, {
  method: method.POST,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    role,
    userName,
    changePercent,
    token
  })
});