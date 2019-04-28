import React, { Component } from 'react';
import { Table, Row, Col, Breadcrumb } from 'antd';
import cloneDeep from 'clone-deep';
import auth from '../../utils/auth';
import Loader from '../../components/Loader';
import { getChipSummary } from '../../request/chipSummary';
import { actions } from '../../utils/enums';
import ChipHistory from '../../components/Popups/ChipHistory';
import SettlementPopup from '../../components/Popups/SettlementPopup';
import {
  formatGetTableData,
  formatGiveTableData,
  getColumns
} from './columns';
import s from './styles';

export default class ChipSummary extends Component {
  constructor(props) {
    super(props);
    const userName = auth.getUserName();
    const role = auth.getAgentRole();
    const id = auth.getAgentId();
    this.state = {
      loading: true,
      tableData: null,
      routes: [{
        key: userName,
        userName,
        id,
        role,
        parentId: id
      }],
      showHistoryPopup: false,
      showSettlementPopup: false,
      userId: '',
      userName: '',
      role: '',
      value: '',
      type: ''
    };
  }

  async componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.setState({ loading: true }, async () => {
      const { routes } = this.state;
      const activeRouteUser = routes[routes.length - 1];
      const jsonResponse = await getChipSummary(activeRouteUser.id, activeRouteUser.role);
      const response = await jsonResponse.json();
      this.setState({ tableData: response.response, loading: false });
    });
  }

  updateSettlementPopup = (value, newState) => this.setState({ showSettlementPopup: value, ...newState })

  updateHistoryPopup = (value, newState) => this.setState({ showHistoryPopup: value, ...newState })

  onBreadCumbClick = (route) => {
    const oldRoutes = cloneDeep(this.state.routes);
    const clickedLayerIndex = oldRoutes.findIndex(r => r.userName === route.userName);
    const newRoutes = oldRoutes.splice(0, clickedLayerIndex + 1);
    this.setState({
      routes: newRoutes
    }, this.fetchData);
  }

  onRowClick = (record, index) => {
    if (record && record.role) {
      this.setState((prevState) => ({
        routes: [
          ...prevState.routes,
          {
            key: record.username,
            userName: record.username,
            id: record._id,
            role: record.role,
            parentId: prevState.routes[prevState.routes.length - 1].id
          }
        ]
      }), () => console.log(this.state.routes) || this.fetchData());
    }
  }

  itemRender = (route) => (
    <span
      onClick={() => this.onBreadCumbClick(route)}
      className={s.breadcumbStyle}
      key={route.userName}
    >
      {route.userName}
    </span>
  )
  
  renderGetData = (getData) => {
    const sum = getData.reduce((acc, value) => {
      if (value.username === 'Cash on hand') {
        return acc + value.total;
      }
      return acc + Math.abs(value.total);
    }, 0);
    const data = formatGetTableData(getData.concat({
      _id: '',
      username: 'Total',
      total: sum
    }));
    return (
      <Table
        columns={getColumns(
          actions.GET,
          this.updateSettlementPopup,
          this.updateHistoryPopup
        )}
        dataSource={data}
        bordered
        onRow={(record, rowIndex) => ({
          onClick: () => this.onRowClick(record, rowIndex)
        })}
      />
    );
  }

  renderGiveData = (giveData) => {
    const sum = giveData.reduce((acc, value) => acc + Math.abs(value.total), 0);
    const data = formatGiveTableData(giveData.concat({
      _id: '',
      total: sum,
      username: 'Total'
    }));
    return (
      <Table
        columns={getColumns(
          actions.GIVE,
          this.updateSettlementPopup,
          this.updateHistoryPopup
        )}
        dataSource={data}
        bordered
        onRow={(record, rowIndex) => ({
          onClick: () => this.onRowClick(record, rowIndex)
        })}
      />
    );
  }

  renderHistoryPopup = () => {
    const { userId, userName, role } = this.state;
    return (
      <ChipHistory
        updateHistoryPopup={this.updateHistoryPopup}
        userId={userId}
        userName={userName}
        role={role}
      />
    );
  }

  renderSettlementPopup = () => {
    const { routes, value, type } = this.state;
    const lastUser = routes[routes.length - 1];
    const { userId, userName, role } = this.state;
    let minValue;
    let maxValue;
    if (type === actions.GET) {
      minValue = -Math.abs(value);
      maxValue = Math.abs(value);
    } else if (type === actions.GIVE) {
      maxValue = 0;
      minValue = -Math.abs(value);
    }
    return (
      <SettlementPopup
        userId={userId}
        userName={userName}
        role={role}
        parentId={lastUser.id}
        minValue={minValue}
        maxValue={maxValue}
        type={type}
        updateSettlementPopup={this.updateSettlementPopup}
        refetchData={this.fetchData}
      />
    )
  }

  render() {
    const {
      loading,
      tableData,
      routes,
      showHistoryPopup,
      showSettlementPopup
    } = this.state;
    if (loading) {
      return <Loader />
    }
    
    const getAmounts = tableData.filter(data => data.action === actions.GET);
    const giveAmounts = tableData.filter(data => data.action === actions.GIVE);
    return (
      <div>
        {showHistoryPopup && this.renderHistoryPopup()}
        {showSettlementPopup && this.renderSettlementPopup()}
        <div className={s.breadcumbWrapper}>
          <Breadcrumb itemRender={this.itemRender} routes={routes} />
        </div>
        <Row gutter={16}>
          <Col lg={12} sm={24}>
            <h1>Get Amounts</h1>
            {this.renderGetData(getAmounts)}
          </Col>
          <Col lg={12} sm={24}>
            <h1>Give Amounts</h1>
            {this.renderGiveData(giveAmounts)}
          </Col>
        </Row>
      </div>
    );
  }
}