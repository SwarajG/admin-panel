import { cookiesList } from './cookieList';

export function setCookies(accessToken) {
  setCookieToStore(cookiesList.accessToken, accessToken);
}

export function getCookieFromKey(key) {
  const pairs = document.cookie.split(';');
  const cookies = {};
  for (let i = 0; i < pairs.length; i++){
    const pair = pairs[i].split('=');
    cookies[(pair[0]+'').trim()] = unescape(pair[1]);
  }
  return cookies[key];
}

export function deleteCookieByName(name) {
  document.cookie = name+'=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function setCookieToStore(key, value) {
  document.cookie = `${key}=${value}`;
}