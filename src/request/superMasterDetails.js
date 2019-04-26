import {
  baseUrl,
  method,
  actionType,
  agentRoles
} from '../utils/enums';
import { cookiesList } from '../utils/auth/cookieList';
import { getCookieFromKey } from '../utils/auth/urlParser';
const token = getCookieFromKey(cookiesList.token);
const userUrl = 'user/get';
const agentUrl = 'agent/get';
const userChangeStatusUrl = 'user/changeStatus';
const agentChangeStatusUrl = 'agent/changeStatus';
const userResetPasswordUrl = 'user/resetPassword';
const agentResetPasswordUrl = 'agent/resetPassword';
const userUpdateUrl = 'user/update';
const agentUpdateUrl = 'agent/update';
const agentDepositUrl = 'agent/depositChips';
const agentWithdrawUrl = 'agent/withdrawChips';
const userDepositUrl = 'user/depositChips';
const userWithDrawUrl = 'user/withdrawChips';
const agentCreateUrl = 'agent/create';
const userCreateUrl = 'user/create';

export const getTableDataDetails = (active, agentRole, parentId) => fetch(
  `${baseUrl}/${agentRole === agentRoles.USER ? userUrl : agentUrl}`, {
  method: method.POST,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    active,
    agentRole,
    parentId,
    status: active,
    token
  })
});

export const changeUserStatus = (agentId, agentRole, active) => fetch(
  `${baseUrl}/${agentRole === agentRoles.USER ? userChangeStatusUrl : agentChangeStatusUrl}`, {
  method: method.POST,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    agentId,
    active,
    agentRole,
    token
  })
});

export const resetPassword = (agentId, newPassword, agentRole) => fetch(
  `${baseUrl}/${agentRole === agentRoles.USER ? userResetPasswordUrl : agentResetPasswordUrl}`, {
  method: method.POST,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    agentId,
    newPassword,
    token
  })
});

export const updateUserInfo = (agentId, agentRole, parentId, firstName, lastName, mobile) => fetch(
  `${baseUrl}/${agentRole === agentRoles.USER ? userUpdateUrl : agentUpdateUrl}`, {
  method: method.POST,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    agentId,
    parentId,
    firstName,
    lastName,
    mobile,
    token
  })
});

const depositAndWithdrawUrl = (type, role) => {
  if (type === actionType.DEPOSIT) {
    return role === agentRoles.USER ? userDepositUrl : agentDepositUrl;
  } else if (type === actionType.WITHDRAW) {
    return role === agentRoles.USER ? userWithDrawUrl : agentWithdrawUrl;
  }
}

export const updateWithDrawDepositStatus = (type, agentId, agentRole, parentId, userName, creditChips, remark) => fetch(
  `${baseUrl}/${depositAndWithdrawUrl(type, agentRole)}`, {
  method: method.POST,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    agentId,
    parentId,
    userName,
    creditChips,
    remark,
    token
  })
});

export const createSuperMaster = (data) => fetch(
  `${baseUrl}/${data.role === agentRoles.USER ? userCreateUrl : agentCreateUrl}`, {
  method: method.POST,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    ...data,
    token
  })
});
