import { getCookieFromKey, setCookies, deleteCookieByName } from './urlParser';
import { getUser, setUser, deleteUser } from './userHelper';
import { cookiesList } from './cookieList';

class Auth {
  constructor() {
    const token = getCookieFromKey(cookiesList.token);
    const user = getUser();
    this.authenticated = !!token;
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
    deleteUser();
    deleteCookieByName(cookiesList.token);
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }

  getUser() {
    return this.user;
  }

  getAgentId() {
    return this.user && this.user.response && this.user.response.agent._id;
  }

  getAgentRole() {
    return this.user && this.user.response && this.user.response.agent.role;
  }
}

export default new Auth();