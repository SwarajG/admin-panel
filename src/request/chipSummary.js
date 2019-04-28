import {
  baseUrl,
  method
} from '../utils/enums';
import { cookiesList } from '../utils/auth/cookieList';
import { getCookieFromKey } from '../utils/auth/urlParser';
const token = getCookieFromKey(cookiesList.token);
const agentSettlementUrl = 'agentSettlement';
const userSettlementUrl = 'playerSettlement';
const agentHistoryUrl = 'agent/settlementList';
const userHistoryUrl = 'user/settlementList';

export const getChipSummary = (agentId, role) => fetch(`${baseUrl}/getChipSummary`, {
  method: method.POST,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    agentId,
    role,
    token
  })
});

export const historyUrl = (id, userName, role) => fetch(
  `${baseUrl}/${role ? agentHistoryUrl : userHistoryUrl}`, {
  method: method.POST,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    ...id,
    userName,
    token
  })
});

export const updateSettlement = ({ parentId, userId, amount, userName, remark, role }) => fetch(
  `${baseUrl}/${role ? agentSettlementUrl : userSettlementUrl}`, {
  method: method.POST,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    parentId,
    userId,
    amount,
    userName,
    remark,
    token
    
  })
});