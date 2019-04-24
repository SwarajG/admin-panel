import React from 'react';
import { Button, Popconfirm } from 'antd';
import { stop, generateWarningMessage } from './tableHelpers';
import { userStatus, actionType } from '../../utils/enums';
import { changeUserStatus } from '../../request/superMasterDetails';
import s from './styles';
const buttonProps = {
  type: 'primary',
  shape: 'circle',
  size: 'small',
  className: s.buttonWrapper
};

const blockColumn = (refetchData) => ({
  title: 'Block',
  render: (text, row) => (
    <Popconfirm
      title={generateWarningMessage('block', row.userName)}
      onCancel={(e) => stop(e)}
      onConfirm={async (e) => {
        stop(e);
        await changeUserStatus(row.currentId, row.role, userStatus.BLOCKED);
        refetchData();
      }}
    >
      <Button {...buttonProps} onClick={(e) => stop(e)}>
        B
      </Button>
    </Popconfirm>
  )
});

const tableLockColumn = (refetchData) => ({
  title: 'T-lock',
  render: (text, row) => (
    <Popconfirm
      title={generateWarningMessage('lock', row.userName)}
      onCancel={(e) => stop(e)}
      onConfirm={async (e) => {
        stop(e);
        await changeUserStatus(row.currentId, row.role, userStatus.LOCKED);
        refetchData();
      }}
    >
      <Button {...buttonProps} onClick={(e) => stop(e)}>
        T
      </Button>
    </Popconfirm>
  )
});

const activeColumn = (refetchData) => ({
  title: 'Active',
  render: (text, row) => (
    <Popconfirm
      title={generateWarningMessage('active', row.userName)}
      onCancel={(e) => stop(e)}
      onConfirm={async (e) => {
        stop(e);
        await changeUserStatus(row.currentId, row.role, userStatus.ACTIVE);
        refetchData();
      }}
    >
      <Button {...buttonProps} onClick={(e) => stop(e)}>
        A
      </Button>
    </Popconfirm>
  )
})

export function getColumns(
  refetchData,
  updatePopupStatus,
  updateWithDrawDepositPopup,
  activeTab
) {
  const columns = [{
    title: 'Sr. No.',
    dataIndex: 'index'
  }, {
    title: 'User Name',
    dataIndex: 'userName',
  }, {
    title: 'Name',
    dataIndex: 'name',
  }, {
    title: 'Admin Cut',
    dataIndex: 'adminCut',
  }, {
    title: 'SubAdmin Cut',
    dataIndex: 'subAdminCut',
  }, {
    title: 'Credit chips',
    dataIndex: 'creditChips',
  }, { 
    title: 'Chips In Use',
    dataIndex: 'chipsInUse',
  }, {
    title: 'Actions',
    render: (text, row) => {
      return (
        <React.Fragment>
          <Button
            {...buttonProps}
            onClick={(e) => {
              stop(e);
              updatePopupStatus(true, {
                firstName: row.firstName,
                lastName: row.lastName,
                mobile: row.mobile,
                userName: row.userName,
                updateAgentId: row.currentId,
                updateParentId: row.parentId,
                agentRole: row.role
              });
            }}
          >
            U
          </Button>
          <Button
            {...buttonProps}
            onClick={(e) => {
              stop(e);
              updateWithDrawDepositPopup(true, {
                userName: row.userName,
                updateAgentId: row.currentId,
                updateParentId: row.parentId,
                agentRole: row.role,
                type: actionType.DEPOSIT
              });
            }}
          >
            D
          </Button>
          <Button
            {...buttonProps}
            onClick={(e) => {
              stop(e);
              updateWithDrawDepositPopup(true, {
                userName: row.userName,
                updateAgentId: row.currentId,
                updateParentId: row.parentId,
                agentRole: row.role,
                type: actionType.WITHDRAW
              });
            }}
          >
            W
          </Button>
        </React.Fragment>
      )
    }
  }];
  if (activeTab === 0) {
    columns.push(
      activeColumn(refetchData),
      tableLockColumn(refetchData)
    );
  } else if (activeTab === 1) {
    columns.push(
      blockColumn(refetchData),
      tableLockColumn(refetchData)
    );
  } else if (activeTab === 2) {
    columns.push(
      blockColumn(refetchData),
      activeColumn(refetchData)
    );
  }
  return columns;
}

export function formatData(data) {
  return data.map((row, index) => ({
    key: index,
    index: index + 1,
    userName: row.userName,
    name: `${row.firstName || ''} ${row.lastName || ''}`,
    firstName: row.firstName,
    lastName: row.lastName,
    adminCut: row.adminCut,
    subAdminCut: row.subAdminCut,
    creditChips: row.creditChips,
    chipsInUse: row.chipsInUse,
    currentId: row._id,
    parentId: row.parentId,
    role: row.role,
    mobile: row.mobile
  }))
}