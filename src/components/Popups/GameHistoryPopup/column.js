import React from 'react';
import moment from 'moment';
import s from './styles';
import { colors } from '../../../utils/enums';
import CardGroup from '../../CardGroup';

const renderUsers = (cards) => {
  const { other, pureSeqs, seqs, trios } = cards;
  const cardList = [];
  if (pureSeqs && pureSeqs.length) {
    cardList.push(
      <CardGroup list={pureSeqs} name="Pure" color={colors.darkGreen} />
    );
  }
  if (seqs && seqs.length) {
    cardList.push(
      <CardGroup list={seqs} name="Impure" color="#87D37C" />
    );
  }
  if (trios && trios.length) {
    cardList.push(
      <CardGroup list={trios} name="Trio" color={colors.darkBlue} />
    );
  }
  if (other && other.length) {
    cardList.push(
      <CardGroup list={other} name="Invalid" color={colors.red} />
    );
  }
  return (
    <div className={s.userWrapper}>
      {cardList}
    </div>
  );
}

export function getColumns() {
  return [{
    title: 'Username',
    dataIndex: 'userName',
    render: (text, row) => (
      <p className={s.textColor(row.isWinner)}>{text}</p>
    )
  }, {
    title: 'Chips',
    dataIndex: 'chips',
    render: (text, row) => (
      <p className={s.textColor(row.isWinner)}>{text}</p>
    )
  }, {
    title: 'Cards',
    render: (text, row) => renderUsers(row.cards)
  }, {
    title: 'Amount',
    dataIndex: 'amount',
    render: (text, row) => (
      <p className={s.textColor(row.isWinner)}>{text}</p>
    )
  }, {
    title: 'Date',
    dataIndex: 'date',
    render: (text, row) => (
      <p className={s.textColor(row.isWinner)}>{text}</p>
    )
  }];
}

export function formatData(data, winner) {
  return data.map(user => ({
    userName: user.userName,
    chips: user.chips,
    amount: user.amount,
    date: `${moment(user.timeStemp).utc().format('YYYY-MM-DD')} ${moment(user.timeStemp).utc().format('HH:mm:ss')}`,
    cards: user.cards,
    isWinner: winner === user.userName
  }))
}