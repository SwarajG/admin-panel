import React, { Component } from 'react';
import { Table } from 'antd';
import { getColumns, formatData } from './columns';
import { getOnlineUsers } from '../../request/onlineUsers';
import Loader from '../../components/Loader';

export default class OnlineUsers extends Component {
  state = {
    tableData: [],
    loading: true
  }
  async componentDidMount() {
    const jsonResponse = await getOnlineUsers();
    const response = await jsonResponse.json();
    this.setState({ tableData: response.response, loading: false });
  }

  render() {
    const { tableData, loading } = this.state;
    if (loading) {
      return <Loader />
    }
    const data = formatData(tableData);
    return (
      <div>
        <h1>Total Online Players: {tableData.length}</h1>
        <Table
          columns={getColumns()}
          dataSource={data}
          bordered
        />
      </div>
    );
  }
}