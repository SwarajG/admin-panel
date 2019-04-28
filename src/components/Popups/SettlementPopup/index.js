import React, { Component } from 'react';
import { Input, InputNumber, Modal, message } from 'antd';
import { updateSettlement } from '../../../request/chipSummary';
import s from './styles';
import { actions } from '../../../utils/enums';

export default class SettlementPopup extends Component {
  constructor(props) {
    super(props);
    let amount;
    if (props.type === actions.GET) {
      amount = props.maxValue;
    } else if (props.type === actions.GIVE) {
      amount = props.minValue;
    }
    this.state = {
      amount: parseInt(amount, 10),
      remark: ''
    };
  }

  updateAmount = amount => this.setState({ amount })

  updateRemark = e => this.setState({ remark: e.target.value.trim() })

  handleSubmit = async () => {
    const { amount, remark } = this.state;
    const { userId, userName, role, parentId, updateSettlementPopup, refetchData } = this.props;
    const jsonResponse = await updateSettlement({
      parentId,
      userId,
      amount,
      userName,
      remark,
      role
    });
    const response = await jsonResponse.json();
    if (response.success === 1) {
      message.success(`Successfully updated the settlement`);
      updateSettlementPopup(false);
      refetchData();
    } else {
      message.error(`Error while updating the settlement`);
    }
  }

  render() {
    const { amount, remark } = this.state;
    const { updateSettlementPopup, minValue, maxValue } = this.props;
    return (
      <Modal
        title="Settlement"
        visible={true}
        onOk={this.handleSubmit}
        onCancel={() => updateSettlementPopup(false)}
      >
        <div>
          <InputNumber
            className={s.inputNumber}
            value={amount}
            onChange={this.updateAmount}
            placeholder="Enter settlement amount"
            min={minValue}
            max={maxValue}
          />
          <Input
            className={s.input}
            value={remark}
            onChange={this.updateRemark}
            placeholder="Enter remark"
          />
        </div>
      </Modal>
    );
  }
}