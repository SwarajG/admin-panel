import React, { Component } from 'react';
import { Modal, message, Input, InputNumber } from 'antd';
import { actionType } from '../../../utils/enums';
import { updateWithDrawDepositStatus } from '../../../request/superMasterDetails';
import s from './styles';

export default class WithDrawDepositPopup extends Component {

  state = {
    amount: 0,
    remark: ''
  };

  updateRemark = (e) => this.setState({ remark: e.target.value.trim() })

  updateAmount = (value) => this.setState({ amount: value })

  handleSubmit = async () => {
    const { amount, remark } = this.state;
    const { type, agentId, parentId, userName, agentRole } = this.props;
    const jsonResponse = await updateWithDrawDepositStatus(type, agentId, agentRole, parentId, userName, amount, remark);
    const response = await jsonResponse.json();
    const action = type.toLowerCase();
    if (response.success === 1) {
      message.success(`Successfully updated the ${action}`);
    } else {
      message.error(`Error while updating the ${action}`);
    }
  }

  render() {
    const { userName, update, type } = this.props;
    const { amount, remark } = this.state;
    return (
      <Modal
        title={`Update ${userName}`}
        visible={true}
        onOk={this.handleSubmit}
        onCancel={() => update(false)}
      >
        <InputNumber
          placeholder={type === actionType.DEPOSIT ? 'Deposit' : 'Withdraw'}
          className={s.numberInputClass}
          value={amount}
          onChange={this.updateAmount}
        />
        <Input
          placeholder="Remark"
          className={s.inputClass}
          value={remark}
          onChange={this.updateRemark}
        />
      </Modal>
    );
  }
}