import setCookies from './urlParser';

export default function LoginRedirect() {
  setCookies();
  window.location.href = '/';
  return null;
}