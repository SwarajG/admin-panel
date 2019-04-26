import React from 'react';
import { css } from 'emotion';
import { navBar } from '../../utils/enums';
import Dashboard from '../Dashboard';
import AccountHistory from '../AccountHistory';
import AllSettlements from '../AllSettlements';
import ChangeParternship from '../ChangeParternship';
import ChipSummary from '../ChipSummary';
import GameHistory from '../GameHistory';
import GeneralSettings from '../GeneralSettings';
import SuperMasterDetails from '../SuperMasterDetails';
import TableDetails from '../TableDetails';
import UserDetails from '../UserDetails';
import SubAdminDetails from '../SubAdminDetails';
import MasterDetails from '../MasterDetails';

const contentWrapper = css`
  min-height: 85vh;
  overflow: auto;
`;

export function renderContentPage(key) {
  let Component;
  switch (key) {
    case navBar.DASHBOARD:
      Component = Dashboard;
      break;
    case navBar.ACCOUNT_HISTORY:
      Component = AccountHistory; 
      break;
    case navBar.ALL_SETTLEMENTS:
      Component = AllSettlements;
      break;
    case navBar.CHANGE_PARTENERSHIP:
      Component = ChangeParternship;
      break;
    case navBar.CHIP_SUMMARY:
      Component = ChipSummary;
      break;
    case navBar.GAME_HISTORY:
      Component = GameHistory;
      break;
    case navBar.GENERAL_SETTINGS:
      Component = GeneralSettings;
      break;
    case navBar.TABLE_DETAILS:
      Component = TableDetails;
      break;
    case navBar.SUPER_MASTER_DETAILS:
      Component = SuperMasterDetails;
      break;
    case navBar.USER_DETAILS:
      Component = UserDetails;
      break;
    case navBar.SUB_ADMIN_DETAILS:
      Component = SubAdminDetails;
      break;
    case navBar.MASTER_DETAILS:
      Component = MasterDetails;
      break;
    default:
      Component = Dashboard;
      break;
  }
  return (
    <div className={contentWrapper}>
      <Component />
    </div>
  )
}