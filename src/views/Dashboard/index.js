import React, { Component } from 'react';
import { Table, Row, Col, Icon, Input, Button, message } from 'antd';
// import { colors } from '../../utils/enums';
import auth from '../../utils/auth';
import Card from '../../components/Card';
import Loader from '../../components/Loader';
import request from '../../request';
import { formatTableData, getColumns } from './columns';
import s from './styles';

const { TextArea } = Input;
const authUser = auth.getUser();
const { agent } = authUser.response;
const agentId = agent._id;

const success = () => {
  message.success('Successfully updated the message...');
};

const error = () => {
  message.error('Failed to updated the message...');
};

export default class Dashboard extends Component {

  state = {
    dashboard: null,
    loading: true,
    message: ''
  };

  async componentDidMount() {
    const jsonResponse = await request.dashboardRequest(agentId);
    const response = await jsonResponse.json();
    this.setState({
      loading: false,
      dashboard: response.response,
      message: response.response.adSMassage
    });
    console.log(response);
  }

  getStatusValues = (summaryCount) => {
    const { status } = summaryCount;
    const activeObject = status.find(s => s._id === 1);
    const blockedObject = status.find(s => s._id === 0);
    const lockedObject = status.find(s => s._id === 2);
    const active = (activeObject && activeObject.count) || 0;
    const blocked = (blockedObject && blockedObject.count) || 0;
    const locked = (lockedObject && lockedObject.count) || 0;
    return {
      active,
      blocked,
      locked
    };
  }

  updateLocalMessage = (e) => {
    const { value } = e.target;
    this.setState({ message: value });
  }

  updateGameMessage = async () => {
    const { message } = this.state;
    const jsonResponse = await request.updateMessage(agentId, message.trim());
    const response = await jsonResponse.json();
    response.success ? success() : error();
  }

  renderCard = ({ title, icon, value, lg, sm, style }) => (
    <Col lg={lg} sm={sm}>
      <Card>
        <p className={s.cardTitle}>{title}</p>
        <div className={s.cardDataWrapper}>
          {icon && <Icon type={icon} className={s.icon()} />}
          <p className={s.cardData} style={style}>{value}</p>
        </div>
      </Card>
    </Col>
  )

  renderTable = (tablePlayers) => {
    const data = formatTableData(tablePlayers);
    return (
      <Table
        columns={getColumns()}
        dataSource={data}
        bordered
      />
    )
  }

  renderSetMessage = () => (
    <div>
      <TextArea
        placeholder="You can write the game description here..."
        autosize={{ minRows: 4 }}
        value={this.state.message}
        onChange={this.updateLocalMessage}
      />
      <Button type="primary" className={s.submitButton} onClick={this.updateGameMessage}>
        Update
      </Button>
    </div>
  )

  render() {
    const { dashboard, loading } = this.state;
    if (loading) {
      return <Loader />
    }
    const {
      totalAgents,
      totalUsers,
      userName,
      summaryCount,
      chipsInUse,
      creditChips,
      tablePlayers
    } = dashboard;
    const { active, blocked } = this.getStatusValues(summaryCount);
    return (
      <div>
        <h1>Admin Details</h1>
        <Row gutter={16}>
          {this.renderCard({ title: 'Admin', value: userName, lg: 8, sm: 12, style: { textTransform: 'capitalize' } })}
          {this.renderCard({ title: 'Agents', icon: 'user', value: totalAgents, lg: 8, sm: 12 })}
        </Row>
        <h1>Chips Details</h1>
        <Row gutter={16}>
          {this.renderCard({ title: 'Credit chips', icon: 'user', value: creditChips, lg: 8, sm: 12 })}
          {this.renderCard({ title: 'Chips in use', value: chipsInUse, lg: 8, sm: 12 })}
        </Row>
        <h1>Users Details</h1>
        <Row gutter={16}>
          {this.renderCard({ title: 'Users', icon: 'team', value: totalUsers, lg: 8, sm: 8 })}
          {this.renderCard({ title: 'Active', icon: 'smile', value: active, lg: 8, sm: 8 })}
          {this.renderCard({ title: 'frown', icon: 'smile', value: blocked, lg: 8, sm: 8 })}
        </Row>
        <Row gutter={16}>
          <Col lg={12} sm={24}>
            <h1>Game Details</h1>
            {this.renderTable(tablePlayers)}
          </Col>
          <Col lg={12} sm={24}>
            <h1>Set Game Message</h1>
            {this.renderSetMessage()}
          </Col>
        </Row>
      </div>
    );
  }
}