import React, { Component } from 'react';
import { Modal, Table } from 'antd';
import s from './styles';
import { getColumns, formatData } from './column';
import { getImageFromCardText } from '../../../utils/helper';

export default class GameHistoryPopup extends Component {
  render() {
    const {
      updateViewDetailsPopup,
      winner,
      winnerType,
      hakamCard,
      activeEntry
    } = this.props;
    const data = formatData(activeEntry, winner);
    return (
      <Modal
        visible={true}
        title="Game details"
        onOk={this.handleSubmit}
        onCancel={() => updateViewDetailsPopup(false)}
        className={s.modalClass}
      >
        <p>Winner: {winner}</p>
        <p>Winner type: {winnerType}</p>
        <p>Hakam card: 
          <img
            src={getImageFromCardText(hakamCard)}
            alt="hakam card"
            width={40}
          />
        </p>
        <div>
          <Table
            columns={getColumns()}
            dataSource={data}
            bordered
          />
        </div>
      </Modal>
    );
  }
}