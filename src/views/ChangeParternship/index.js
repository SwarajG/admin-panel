import React, { Component } from 'react';
import { Input, InputNumber, Radio, message, Button } from 'antd';
import Card from '../../components/Card';
import { changePartnership } from '../../request/changePartnership';
import { agentRoles } from '../../utils/enums';
import s from './styles';

const RadioGroup = Radio.Group;

export default class ChangeParternship extends Component {
  state = {
    role: agentRoles.SUB_ADMIN,
    userName: '',
    changePercent: null
  };

  updatePartnership = async () => {
    const { role, userName, changePercent } = this.state;
    if (!userName || !changePercent) {
      message.error('Please fill all the required fields');
      return;
    }
    const jsonResponse = await changePartnership(role, userName, changePercent);
    const response = await jsonResponse.json();
    if (response.success === 1) {
      message.success('Successfully updated the parternship');
      this.setState({ userName: '', changePercent: null, role: agentRoles.SUB_ADMIN });
    } else if (response.success === 0) {
      message.error(response.response);
    }
  }

  onRadioChange = e => this.setState({ role: e.target.value })

  onUserNameChange = e => this.setState({ userName: e.target.value })

  onPercentageChange = value => this.setState({ changePercent: value })

  render() {
    const { role, userName, changePercent } = this.state;
    return (
      <div className={s.formWrapper}>
        <Card>
          <div className={s.inputWrapper}>
            <RadioGroup onChange={this.onRadioChange} value={role}>
              <Radio value={agentRoles.SUB_ADMIN}>{agentRoles.SUB_ADMIN}</Radio>
              <Radio value={agentRoles.SUPER_MASTER}>{agentRoles.SUPER_MASTER}</Radio>
              <Radio value={agentRoles.MASTER}>{agentRoles.MASTER}</Radio>
            </RadioGroup>
          </div>
          <div className={s.inputWrapper}>
            <Input
              value={userName}
              placeholder="Username"
              onChange={this.onUserNameChange}
              className={s.inputLength}
            />
          </div>
          <div className={s.inputWrapper}>
            <InputNumber
              className={s.inputLength}
              value={changePercent}
              placeholder="Partnership(+/-)"
              onChange={this.onPercentageChange}
              min={-100}
              max={100}
            />
          </div>
          <Button type="primary" onClick={this.updatePartnership}>
            Submit
          </Button>
        </Card>
      </div>
    );
  }
}