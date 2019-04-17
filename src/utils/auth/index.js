import { getCookieFromKey, setCookies, deleteCookieByName } from './urlParser';
import { getUser, setUser } from './userHelper';
import { cookiesList } from './cookieList';

class Auth {
  constructor() {
    const accessToken = getCookieFromKey(cookiesList.accessToken);
    const user = getUser();
    this.authenticated = !!accessToken;
    this.user = user;
  }

  login(user, cb) {
    this.authenticated = true;
    setUser(user);
    setCookies(user.response.token);
    this.user = user;
    cb();
  }

  logout(cb) {
    this.authenticated = false;
    this.user = null;
    deleteCookieByName(cookiesList.accessToken);
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }

  getUser() {
    return this.user;
  }
}

export default new Auth();