import React, { Component } from 'react';
import { DatePicker, Input, Button, Radio, Table } from 'antd';
import { getAccountHistory } from '../../request/accountHistory';
import { getColumns, formatHistoryData } from './column';
import Loader from '../../components/Loader';
import moment from 'moment';
import s from './styles';

const { RangePicker } = DatePicker;
const RadioGroup = Radio.Group;

export default class AccountHistory extends Component {
  state = {
    startDate: null,
    endDate: null,
    userName: '',
    radioValue: 1,
    loading: false,
    tableData: []
  }

  searchResults = () => {
    this.setState({ loading: true }, async () => {
      const { userName, startDate, endDate, radioValue } = this.state;
      let requestObject = {
        dateTimeEnd: endDate,
        dateTimeStart: startDate,
        type: radioValue
      };
      if (userName) {
        requestObject.userName = userName;
      }
      const jsonResponse = await getAccountHistory(requestObject);
      const response = await jsonResponse.json();
      this.setState({ loading: false, tableData: response.response });
    });
  }

  onDatesChange = (value) => {
    const date1 = moment(value[0]).format('YYYY-MM-DD');
    const date2 = moment(value[1]).format('YYYY-MM-DD');
    const startDate = new Date(date1).toISOString();
    const endDate = new Date(date2).toISOString();
    this.setState({
      startDate,
      endDate
    });
  }

  onRadioChange = e => this.setState({ radioValue: e.target.value })

  updateName = e => this.setState({ userName: e.target.value })

  renderTable = (data) => (
    <Table
      columns={getColumns()}
      dataSource={formatHistoryData(data)}
      bordered
    />
  )

  render() {
    const {
      userName,
      radioValue,
      loading,
      tableData
    } = this.state;
    return (
      <div>
        <div className={s.searchWrapper}>
          <div className={s.formWrapper}>
            <div>
              <RangePicker
                format="DD-MM-YYYY"
                placeholder={['Start Date', 'End Date']}
                onChange={this.onDatesChange}
              />
            </div>
            <div className={s.columnWrapper}>
              <Input
                value={userName}
                onChange={this.updateName}
                placeholder="Username"
              />
            </div>
            <div className={s.columnWrapper}>
              <RadioGroup onChange={this.onRadioChange} value={radioValue}>
                <Radio value={1}>Settlement</Radio>
                <Radio value={2}>Free chips</Radio>
              </RadioGroup>
            </div>
          </div>
          <div className={s.columnWrapper}>
            <Button type="primary" icon="search" onClick={this.searchResults}>
              Search
            </Button>
          </div>
        </div>
        <div className={s.resultWrapper}>
          {loading ? <Loader /> : this.renderTable(tableData)}
        </div>
      </div>
    );
  }
}