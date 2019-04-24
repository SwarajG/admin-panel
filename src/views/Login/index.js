import React, { Component } from 'react';
import { Input, Icon, Button } from 'antd';
import { loginRequest } from '../../request/login';
import auth from '../../utils/auth'
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
    const user = this.state;
    const jsonResponse = await loginRequest(user);
    const response = await jsonResponse.json();
    if (response.success) {
      auth.login(response, () => {
        this.props.history.push('/dashboard');
      });
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
          />
        </div>
        <div className={s.inputWrapper}>
          <Input.Password
            placeholder="Enter your password"
            value={password}
            onChange={this.updateValue('password')}
          />
        </div>
        <div className={s.inputWrapper}>
          <Button type="primary" onClick={this.loginUser}>Submit</Button>
        </div>
      </div>
    );
  }
}