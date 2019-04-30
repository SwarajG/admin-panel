import {
  baseUrl,
  method
} from '../utils/enums';
import { cookiesList } from '../utils/auth/cookieList';
import { getCookieFromKey } from '../utils/auth/urlParser';
const token = getCookieFromKey(cookiesList.token);

export const getGameHistory = (dateTimeStart, dateTimeEnd, userName) => fetch(`${baseUrl}/game/handLogs`, {
  method: method.POST,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    dateTimeStart,
    dateTimeEnd,
    userName,
    token
  })
});