import * as LoginRequests from './login';
import * as DashbaordRequests from './dashboard';

export default {
  ...LoginRequests,
  ...DashbaordRequests
};