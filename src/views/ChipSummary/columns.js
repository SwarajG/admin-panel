import React from 'react';
import { actions } from '../../utils/enums';
import s from './styles';

export function getColumns(type) {
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
    render: (text, row) => {
      if (type === actions.GET) {
        return <p className={s.greenText}>{row.total}</p>;
      }
      return <p className={s.redText}>{row.total}</p>;
    }
  }, {
    title: 'Settlement'
  }];
}

export function formatGiveTableData(data) {
  const filteredData = data.filter(d => d.username !== 'SP OWN' && d.username !== 'PARENT AC');
  return filteredData.map((giveData, index) => ({
    index: index + 1,
    username: giveData.username,
    name: `${giveData.firstName || ''} ${giveData.lastName || ''}`,
    total: (giveData.total / 100).toFixed(2)
  }));
}

export function formatGetTableData(data) {
  const filteredData = data.filter(d => d.username !== 'Cash on hand' && d.username !== 'PARENT AC');
  return filteredData.map((getData, index) => ({
    index: index + 1,
    username: getData.username,
    name: `${getData.firstName || ''} ${getData.lastName || ''}`,
    total: (getData.total / 100).toFixed(2)
  }));
}