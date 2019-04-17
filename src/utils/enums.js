const baseUrl = 'http://85.159.208.197:4000';

const headers = {
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include'
};

const method = {
  POST: 'POST',
  GET: 'GET'
};

const navBar = {
  DASHBOARD: 'Dashboard',
  GENERAL_SETTINGS: 'General Settings',
  CHANGE_PARTENERSHIP: 'Change Partenership',
  TABLE_DETAILS: 'Table Details',
  SUPER_MASTER_DETAILS: 'Super Master Details',
  GAME_HISTORY: 'Game History',
  ACCOUNT_HISTORY: 'Account History',
  CHIP_SUMMARY: 'Chip Summary',
  ALL_SETTLEMENTS: 'All Settlements'
};

export {
  baseUrl,
  headers,
  method,
  navBar
};