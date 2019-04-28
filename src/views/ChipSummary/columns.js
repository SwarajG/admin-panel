import React from 'react';
import { Button } from 'antd';
import { actions } from '../../utils/enums';
import s from './styles';

const buttonProps = {
  type: 'primary',
  shape: 'circle',
  size: 'small',
  className: s.buttonWrapper
};

export function getColumns(type, updateSettlementPopup, updateHistoryPopup) {
  return [{
    title: 'Sr. No.',
    dataIndex: 'index'
  }, {
    title: 'User Name',
    dataIndex: 'username',
  }, {
    title: 'Name',
    dataIndex: 'name',
  }, {
    title: 'Total',
    dataIndex: 'total',
    sorter: (a, b) => (a._id === '' || b._id === '') ? 0 : (a.total - b.total ? 1 : -1),
    render: (text, row) => {
      if (type === actions.GET) {
        return <p className={s.redText}>{row.total}</p>;
      }
      return <p className={s.greenText}>{row.total}</p>;
    }
  }, {
    title: 'Settlement',
    render: (text, row) => row._id !== '' ? (
      <React.Fragment>
        <Button
          {...buttonProps}
          onClick={(e) => {
            e.stopPropagation();
            updateSettlementPopup(true, {
              userName: row.username,
              userId: row._id,
              role: row.role,
              value: row.value,
              type
            });
          }}
        >
          S
        </Button>
        <Button
          {...buttonProps}
          onClick={(e) => {
            e.stopPropagation();
            updateHistoryPopup(true, {
              userName: row.username,
              userId: row._id,
              role: row.role,
              value: row.value,
              type
            });
          }}
        >
          H
        </Button>
      </React.Fragment>
    ) : null
  }];
}

export function formatGiveTableData(data) {
  return data.map((giveData, index) => ({
    _id: giveData._id,
    role: giveData.role,
    index: index + 1,
    key: giveData.username,
    username: giveData.username,
    name: `${giveData.firstName || ''} ${giveData.lastName || ''}`,
    total: (Math.abs(giveData.total) / 100).toFixed(2),
    value: giveData.total
  }));
}

export function formatGetTableData(data) {
  return data.map((getData, index) => ({
    _id: getData._id,
    role: getData.role,
    index: index + 1,
    key: getData.username,
    username: getData.username,
    name: `${getData.firstName || ''} ${getData.lastName || ''}`,
    total: (Math.abs(getData.total) / 100).toFixed(2),
    value: getData.total
  }));
}