// const baseUrl = 'http://85.159.208.197:4000';
const baseUrl = 'http://13.232.25.215:5000';

const headers = {
  headers: {
    'Content-Type': 'application/json'
  }
};

const method = {
  POST: 'POST',
  GET: 'GET'
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
}

export {
  baseUrl,
  headers,
  method,
  navBar,
  colors
};