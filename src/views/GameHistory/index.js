import React, { Component } from 'react';
import { DatePicker, TimePicker, Input, message, Button, Table } from 'antd';
import { getGameHistory } from '../../request/gameHistory';
import { formatData, getColumns } from './column';
import Loader from '../../components/Loader';
import s from './styles';
import GameHistoryPopup from '../../components/Popups/GameHistoryPopup';

export default class GameHistory extends Component {
  state = {
    startTimeMoment: null,
    endTimeMoment: null,
    startTime: null,
    endTime: null,
    date: null,
    userName: '',
    loading: false,
    tableData: [],
    activeEntry: null,
    showViewDetails: false,
    winner: '',
    winnerType: '',
    hakamCard: ''
  };

  onDateChange = (date, dateString) => {
    this.setState({ date: dateString });
  }

  onStartTimeChange = (time, timeString) => {
    this.setState({ startTime: timeString, startTimeMoment: time });
  }

  onEndTimeChange = (time, timeString) => {
    this.setState({ endTime: timeString, endTimeMoment: time });
  }

  onUserNameChange = (e) => this.setState({ userName: e.target.value })

  onSearch = async () => {
    const { userName, startTime, endTime, date } = this.state;
    if (!userName || !startTime || !endTime || !date) {
      message.error('Please fill all the fields');
      return;
    }
    this.setState({ loading: true });
    const startDate = new Date(date + ' ' + startTime + ':00').toISOString();
    const endDate = new Date(date + ' ' + endTime + ':00').toISOString();
    const jsonResponse = await getGameHistory(startDate, endDate, userName);
    const response = await jsonResponse.json();
    if (response.success === 1) {
      this.setState({
        loading: false,
        userName: '',
        startTime: null,
        endTime: null,
        startTimeMoment: null,
        endTimeMoment: null,
        date: null,
        tableData: response.response
      });
    } else if (response.success === 0) {
      this.setState({ loading: false });
      message.error(response.response);
    }
  }

  updateViewDetailsPopup = (value, info) => this.setState({ showViewDetails: value, ...info })

  renderTable = () => {
    const { tableData } = this.state;
    const data = formatData(tableData);
    return (
      <Table
        columns={getColumns(this.updateViewDetailsPopup)}
        dataSource={data}
        bordered
      />
    );
  }
  
  renderDetailsPopup = () => (
    <GameHistoryPopup
      updateViewDetailsPopup={this.updateViewDetailsPopup}
      activeEntry={this.state.activeEntry}
      winner={this.state.winner}
      winnerType={this.state.winnerType}
      hakamCard={this.state.hakamCard}
    />
  )

  render() {
    const {
      userName,
      tableData,
      loading,
      startTimeMoment,
      endTimeMoment,
      showViewDetails
    } = this.state;
    return (
      <div>
        <div className={s.formWrapper}>
          <div className={s.allInputWrapper}>
            <div className={s.inputWrapper}>
              <DatePicker
                onChange={this.onDateChange}
              />
            </div>
            <div className={s.inputWrapper}>
              <TimePicker
                onChange={this.onStartTimeChange}
                format="HH:mm"
                use12Hours={true}
                value={startTimeMoment}
              />
            </div>
            <div className={s.inputWrapper}>
              <TimePicker
                onChange={this.onEndTimeChange}
                format="HH:mm"
                use12Hours={true}
                value={endTimeMoment}
              />
            </div>
            <div className={s.inputWrapper}>
              <Input
                value={userName}
                placeholder="Username"
                onChange={this.onUserNameChange}
              />
            </div>
          </div>
          <div>
            <Button type="primary" onClick={this.onSearch}>
              Search
            </Button>
          </div>
        </div>
        {showViewDetails && this.renderDetailsPopup()}
        <div className={s.responseWrapper}>
          {loading ? <Loader /> : (tableData ? this.renderTable() : null) }
        </div>
      </div>
    );
  }
}