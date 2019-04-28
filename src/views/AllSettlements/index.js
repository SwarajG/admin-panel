import React, { Component } from 'react';
import { Table } from 'antd';
import { getAllSettlement } from '../../request/allSettlement';
import { getColumns, formatData } from './column';
import Loader from '../../components/Loader';

export default class AllSettlements extends Component {
  state = {
    loading: false,
    tableData: []
  }

  async componentDidMount() {
    const jsonResponse = await getAllSettlement();
    const response = await jsonResponse.json();
    console.log(response);
    this.setState({
      tableData: response.response,
      loading: false
    });
  }

  render() {
    const { loading, tableData } = this.state;
    if (loading) {
      return <Loader />
    }
    return (
      <div>
        <Table
          columns={getColumns()}
          dataSource={formatData(tableData)}
          bordered
        />
      </div>
    );
  }
}