import React, { Component } from 'react';
import { Table, Row, Col } from 'antd';
import auth from '../../utils/auth';
import Loader from '../../components/Loader';
import { getChipSummary } from '../../request/chipSummary';
import { actions } from '../../utils/enums';
import {
  formatGetTableData,
  formatGiveTableData,
  getColumns
} from './columns';

export default class ChipSummary extends Component {
  state = {
    loading: true,
    chipData: null
  };

  async componentDidMount() {
    const jsonResponse = await getChipSummary();
    const response = await jsonResponse.json();
    this.setState({ loading: false, chipData: response.response });
  }
  
  renderGetData = (getData) => {
    const data = formatGetTableData(getData);
    return (
      <Table
        columns={getColumns()}
        dataSource={data}
        bordered
      />
    );
  }

  renderGiveData = (giveData) => {
    const data = formatGiveTableData(giveData);
    return (
      <Table
        columns={getColumns()}
        dataSource={data}
        bordered
      />
    );
  }

  render() {
    const { loading, chipData } = this.state;
    if (loading) {
      return <Loader />
    }
    
    const getAmounts = chipData.filter(data => data.action === actions.GET);
    const giveAmounts = chipData.filter(data => data.action === actions.GIVE);
    return (
      <div>
        <h1>Account history - {auth.getAgentRole()}</h1>
        <Row gutter={16}>
          <Col lg={12} sm={24}>
            {this.renderGetData(getAmounts)}
          </Col>
          <Col lg={12} sm={24}>
            {this.renderGiveData(giveAmounts)}
          </Col>
        </Row>
      </div>
    );
  }
}