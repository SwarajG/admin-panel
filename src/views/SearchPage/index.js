import React, { Component } from 'react';
import { Radio, Input, Button, message } from 'antd';
import { css } from 'emotion';
import Card from '../../components/Card';
import { agentRoles } from '../../utils/enums';
import { searchUser } from '../../request/searchRequest';
import Loader from '../../components/Loader';
import s from './styles';

const RadioGroup = Radio.Group;
const cardWrapper = css`
  margin-top: 20px;
`;

export default class SearchPage extends Component {
  state = {
    role: agentRoles.SUB_ADMIN,
    userName: '',
    userData: null,
    loading: false
  };

  updateName = e => this.setState({ userName: e.target.value })

  onRadioChange = e => this.setState({ role: e.target.value })

  onSearchClick = async () => {
    const { role, userName } = this.state;
    if (!userName) {
      message.error('Please fill all the information');
      return;
    }
    this.setState({ loading: true }, async () => {
      const jsonResponse = await searchUser(role, userName);
      const response = await jsonResponse.json();
      this.setState({ userData: response.response, loading: false });
    })
  }

  renderCard = () => {
    const { userData } = this.state;
    return (
      <div className={cardWrapper}>
        <Card>
          {Object.entries(userData).map(([key, value])=> {
            return (
              <p>{key}: {value}</p>
            )
          })}
        </Card>
      </div>
    )
  }

  render() {
    const { userName, role, loading, userData } = this.state;
    return (
      <div>
        <div className={s.formWrapper}>
          <div className={s.formInputs}>
            <div>
              <RadioGroup onChange={this.onRadioChange} value={role}>
                <Radio value={agentRoles.SUB_ADMIN}>{agentRoles.SUB_ADMIN}</Radio>
                <Radio value={agentRoles.SUPER_MASTER}>{agentRoles.SUPER_MASTER}</Radio>
                <Radio value={agentRoles.MASTER}>{agentRoles.MASTER}</Radio>
                <Radio value={agentRoles.USER}>{agentRoles.USER}</Radio>
              </RadioGroup>
            </div>
            <div className={s.inputWrapper}>
              <Input
                value={userName}
                onChange={this.updateName}
                placeholder="Username"
              />
            </div>
          </div>
          <div className={s.inputWrapper}>
            <Button type="primary" icon="search" onClick={this.onSearchClick}>Search</Button>
          </div>
        </div>
        {userData ? (
          loading ? <Loader /> : this.renderCard()
        ) : null}
      </div>
    );
  }
}