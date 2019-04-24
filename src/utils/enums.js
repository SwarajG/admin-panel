// const baseUrl = 'http://85.159.208.197:4000';
const baseUrl = 'http://85.159.208.197:5000';

const headers = {
  headers: {
    'Content-Type': 'application/json'
  }
};

const userStatus = {
  ACTIVE: 1,
  BLOCKED: 0,
  LOCKED: 2
};

const method = {
  POST: 'POST',
  GET: 'GET'
};

const actions = {
  GET: 'GET',
  GIVE: 'GIVE'
};

const navBar = {
  DASHBOARD: 'Dashboard',
  ONLINE_USERS: 'Online Users',
  GENERAL_SETTINGS: 'General Settings',
  SUB_ADMIN_DETAILS: 'Sub Admin Details',
  CHANGE_PARTENERSHIP: 'Change Partenership',
  TABLE_DETAILS: 'Table Details',
  SUPER_MASTER_DETAILS: 'Super Master Details',
  GAME_HISTORY: 'Game History',
  ACCOUNT_HISTORY: 'Account History',
  CHIP_SUMMARY: 'Chip Summary',
  ALL_SETTLEMENTS: 'All Settlements',
  SEARCH: 'Search'
};

const colors = {
  green: '#52c41a',
  red: '#f5222d'
};

const selectedKey = {
  dashboard: navBar.DASHBOARD,
  'online-users': navBar.ONLINE_USERS,
  'general-settings': navBar.GENERAL_SETTINGS,
  'sub-admin-details': navBar.SUB_ADMIN_DETAILS,
  'change-partenership': navBar.CHANGE_PARTENERSHIP,
  'table-details': navBar.TABLE_DETAILS,
  'super-master-details': navBar.SUPER_MASTER_DETAILS,
  'game-history': navBar.GAME_HISTORY,
  'account-history': navBar.ACCOUNT_HISTORY,
  'chip-summary': navBar.CHIP_SUMMARY,
  'all-settlements': navBar.ALL_SETTLEMENTS,
  search: navBar.SEARCH
};

const agentRoles = {
  SUPER_MASTER: 'SUPER_MASTER',
  SUB_ADMIN: 'SUB_ADMIN',
  USER: 'USER'
};

const roles = [{
  name: 'ADMIN',
  path: 'admin',
  breadcrumbName: 'Admin'
},{
  name: 'SUB_ADMIN',
  path: 'sub-admin',
  breadcrumbName: 'Sub Admin'
}, {
  name: 'SUPER_MASTER',
  path: 'super-master',
  breadcrumbName: 'Super Master'
}, {
  name: 'MASTER',
  path: 'master',
  breadcrumbName: 'Master'
}, {
  name: 'USER',
  path: 'user',
  breadcrumbName: 'User'
}];

const actionType = {
  DEPOSIT: 'DEPOSIT',
  WITHDRAW: 'WITHDRAW'
};

export {
  baseUrl,
  headers,
  method,
  navBar,
  colors,
  selectedKey,
  actions,
  agentRoles,
  roles,
  userStatus,
  actionType
};