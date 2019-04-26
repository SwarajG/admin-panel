import React, { Component } from 'react';
import { Input, Icon, Button, message } from 'antd';
import { loginRequest } from '../../request/login';
import auth from '../../utils/auth';
import s from './styles';

export default class Login extends Component {
  state = {
    userName: '',
    password: ''
  };

  updateValue = key => event => {
    const value = event.target.value.trim();
    this.setState({ [key]: value });
  }

  loginUser = async () => {
    const { userName, password } = this.state;
    if (!userName) {
      message.error('Please enter user name');
    }
    if (!password) {
      message.error('Please enter password');
    }
    const jsonResponse = await loginRequest(this.state);
    const response = await jsonResponse.json();
    if (response.success) {
      auth.login(response, () => {
        this.props.history.push('/dashboard');
      });
    } else {
      message.error(response.response);
    }
  }

  onNameKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.loginUser();
    }
  }

  render() {
    const { userName, password } = this.state;
    if (auth.isAuthenticated()) {
      window.location.href = '/dashboard';
    }
    return (
      <div className={s.contentWrapper}>
        <p className={s.title}>Login</p>
        <div className={s.inputWrapper}>
          <Input
            placeholder="Enter your username"
            suffix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            value={userName}
            onChange={this.updateValue('userName')}
            onKeyPress={this.onNameKeyPress}
          />
        </div>
        <div className={s.inputWrapper}>
          <Input.Password
            placeholder="Enter your password"
            value={password}
            onChange={this.updateValue('password')}
            onKeyPress={this.onNameKeyPress}
          />
        </div>
        <div className={s.inputWrapper}>
          <Button type="primary" onClick={this.loginUser}>Submit</Button>
        </div>
      </div>
    );
  }
}