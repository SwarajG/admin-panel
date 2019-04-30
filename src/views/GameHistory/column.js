import React from 'react';
import moment from 'moment';
import { Button } from 'antd';

export function getColumns(updateViewDetailsPopup) {
  return [{
    title: 'Sr. No.',
    dataIndex: 'index'
  }, {
    title: 'Boot Amount',
    dataIndex: 'bootAmount'
  }, {
    title: 'Winner',
    dataIndex: 'winner'
  }, {
    title: 'Date Time',
    dataIndex: 'date'
  }, {
    title: 'View Details',
    render: (text, row) => (
      <Button
        type="primary"
        onClick={() => updateViewDetailsPopup(true, {
          winner: row.winner,
          winnerType: row.winnerType,
          hakamCard: row.hakamCard,
          activeEntry: row.players
        })}
      >
        View Details
      </Button>
    )
  }];
}

export function formatData(data) {
  return data.map((entry, index) => ({
    index: index + 1,
    bootAmount: entry.bootAmount,
    winner: entry.Winner,
    date: `${moment(entry.timestamp).utc().format('YYYY-MM-DD')} ${moment(entry.timestamp).utc().format('HH:mm:ss')}}`,
    players: entry.players,
    winnerType: entry.WinnerType,
    hakamCard: entry.hakamCard
  }));
}