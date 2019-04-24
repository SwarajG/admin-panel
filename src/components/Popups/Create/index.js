import React, { Component } from 'react';
import { Modal, Row, Col, Input, InputNumber, message } from 'antd';
import { css } from 'emotion';

const inputClass = css`
  margin-bottom: 10px;
`;

const numberInputClass = css`
  width: 100%;
  margin-bottom: 10px;
`;

const error = (text) => {
  message.error(text);
}

export default class Create extends Component {
  state = {
    userName: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    adminCut: '',
    creditChips: ''
  };

  updateValue = (key) => (e) => {
    const value = e.target.value.trim();
    this.setState({
      [key]: value
    });
  }

  updateNumberValue = (key) => (value) => {
    this.setState({
      [key]: value
    });
  }

  getSuperMasterData = () => {
    const {
      userName,
      firstName,
      lastName,
      password,
      confirmPassword,
      mobile,
      adminCut,
      creditChips
    } = this.state;
    if (!(userName && mobile && password && confirmPassword && adminCut && creditChips)) {
      error('Please fill all the required fileds');
      return;
    }
    if (password !== confirmPassword) {
      error('Password does not match');
      return;
    }
    return {
      userName,
      firstName,
      lastName,
      password,
      mobile,
      adminCut,
      creditChips
    };
  }

  renderInput = ({ placeholder, key, ...rest }) => (
    <Col lg={12} sm={24}>
      <Input
        placeholder={placeholder}
        className={inputClass}
        onChange={this.updateValue(key)}
        {...rest}
      />
    </Col>
  )

  renderInputNumber = ({ key, ...rest }) => (
    <Col lg={12} sm={24}>
      <InputNumber
        className={numberInputClass}
        onChange={this.updateNumberValue(key)}
        {...rest}
      />
    </Col>
  )

  render() {
    const { title, onOkClick, onCancel } = this.props;
    return (
      <Modal
        title={title}
        visible={true}
        onOk={() => onOkClick(this.getSuperMasterData())()}
        onCancel={onCancel}
      >
        <Row gutter={16}>
          {this.renderInput({ placeholder: 'User name*', key: 'userName' })}
          {this.renderInput({ placeholder: 'First name', key: 'firstName' })}
          {this.renderInput({ placeholder: 'Last name', key: 'lastName' })}
          {this.renderInput({ placeholder: 'Password*', key: 'password', type: 'password' })}
          {this.renderInput({ placeholder: 'Confirm password*', key: 'confirmPassword', type: 'password' })}
          {this.renderInputNumber({ placeholder: 'Mobile number*', key: 'mobile', maxLength: 10 })}
          {this.renderInputNumber({ placeholder: 'Admin cut*', key: 'adminCut', min: 0, max: 100 })}
          {this.renderInputNumber({ placeholder: 'Credit chips*', key: 'creditChips', min: 0 })}
        </Row>
      </Modal>
    );
  }
}