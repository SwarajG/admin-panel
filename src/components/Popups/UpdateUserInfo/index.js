import React, { Component } from 'react';
import { Modal, Tabs, Input, InputNumber, message } from 'antd';
import { updateUserInfo, resetPassword } from '../../../request/superMasterDetails';
import s from './styles';
const TabPane = Tabs.TabPane;

export default class ChangeUserInfo extends Component {
  constructor(props) {
    super(props);
    const { firstName, lastName, mobile } = props;
    this.state = {
      firstName,
      lastName,
      mobile,
      activeTab: '1',
      password: '',
      confirmPassword: ''
    };
  }

  updateValue = key => e => this.setState({ [key]: e.target.value.trim() })

  updateNumber = value => this.setState({ mobile: value })

  onTabChange = value => this.setState({ activeTab: value })

  handleSubmit = async () => {
    const { firstName, lastName, mobile, activeTab } = this.state;
    const { agentId, parentId, updatePopupStatus, refetchData, agentRole } = this.props;
    if (activeTab === '1') {
      const jsonResponse = await updateUserInfo(agentId, agentRole, parentId, firstName, lastName, mobile);
      const response = await jsonResponse.json();
      response.success === 1 ?
          message.success('Successfully update the user details') :
          message.error('Error while updating the user details');
      updatePopupStatus(false);
      refetchData();
    } else if (activeTab === '2') {
      const { password, confirmPassword } = this.state;
      if (password === confirmPassword) {
        const jsonResponse = await resetPassword(agentId, password, agentRole);
        const response = await jsonResponse.json();
        updatePopupStatus(false);
        response.success === 1 ?
          message.success('Successfully update the passoword') :
          message.error('Error while updating the password');
      } else {
        message.error('Password does not match');
      }
    }
  }

  render() {
    const { userName, updatePopupStatus } = this.props;
    const { firstName, lastName, mobile, password, confirmPassword, activeTab } = this.state;
    return (
      <Modal
        title={`Update ${userName}`}
        visible={true}
        onOk={this.handleSubmit}
        onCancel={() => updatePopupStatus(false)}
      >
        <Tabs activeKey={activeTab} onChange={this.onTabChange}>
          <TabPane tab="Update Details" key="1">
            <Input
              placeholder="First Name"
              className={s.inputClass}
              value={firstName}
              onChange={this.updateValue('firstName')}
            />
            <Input
              placeholder="Last Name"
              className={s.inputClass}
              value={lastName}
              onChange={this.updateValue('lastName')}
            />
            <InputNumber
              placeholder="Mobile Number"
              className={s.numberInput}
              value={mobile}
              onChange={this.updateNumber}
            />
          </TabPane>
          <TabPane tab="Update Password" key="2">
            <Input.Password
              placeholder="Password"
              className={s.inputClass}
              value={password}
              onChange={this.updateValue('password')}
            />
            <Input.Password
              placeholder="Confirm Passowrd"
              className={s.inputClass}
              value={confirmPassword}
              onChange={this.updateValue('confirmPassword')}
            />
          </TabPane>
        </Tabs>
      </Modal>
    );
  }
}