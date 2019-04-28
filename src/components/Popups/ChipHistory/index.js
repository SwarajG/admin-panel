import React, { Component } from 'react';
import { css } from 'emotion';
import { Modal, Table } from 'antd';
import { getColumns, getFormatData } from './column';
import { historyUrl }from '../../../request/chipSummary';
import Loader from '../../Loader';

const className = css`
  margin-top: 40px;
`;

export default class ChipHistory extends Component {
  state = {
    tableData: [],
    loading: true
  }

  async componentDidMount() {
    const { userId, userName, role } = this.props;
    let idObject = {};
    if (role) {
      idObject = { agentId: userId };
    } else {
      idObject = { userId };
    }
    const jsonResponse = await historyUrl(idObject, userName, role);
    const response = await jsonResponse.json();
    this.setState({ tableData: response.response, loading: false });
  }

  render() {
    const { updateHistoryPopup } = this.props;
    const { tableData, loading } = this.state;
    const data = getFormatData(tableData);
    return (
      <Modal
        title="History"
        visible={true}
        onOk={this.handleSubmit}
        onCancel={() => updateHistoryPopup(false)}
      >
        {loading ? <Loader className={className} /> : (
          <Table
            columns={getColumns()}
            dataSource={data}
            bordered
          />
        )}
      </Modal>
    );
  }
}