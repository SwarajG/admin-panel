import React, { Component } from 'react';
import { Radio, Table, Button, Breadcrumb, message } from 'antd';
import { formatData, getColumns } from './columns';
import { roles } from '../../utils/enums';
import cloneDeep from 'clone-deep';
import { getTableDataDetails, createSuperMaster } from '../../request/superMasterDetails';
import Create from '../../components/Popups/Create';
import Loader from '../../components/Loader';
import s from './styles';
import auth from '../../utils/auth';
import ChangeUserInfo from '../../components/Popups/UpdateUserInfo';
import WithDrawDepositPopup from '../../components/Popups/DepositWithdraw';

export default class DetailsPage extends Component {
  constructor(props) {
    super(props);
    const { activeLayerIndex } = props;
    this.state = {
      activeTabStatus: 1,
      tableData: null,
      loading: true,
      showSuperMasterPopup: false,
      activeLayerIndex,
      routes: [{
        ...roles[activeLayerIndex],
        parentId: auth.getAgentId()
      }],
      showUpdatePopup: false,
      firstName: '',
      lastName: '',
      mobile: '',
      userName: '',
      updateAgentId: '',
      updateParentId: '',
      showWithDrawDepositPopup: false,
      type: '',
      agentRole: ''
    };
  }

  componentDidMount() {
    const { activeTabStatus } = this.state;
    const { routes } = this.state;
    this.fetchData(activeTabStatus, routes[routes.length - 1].parentId);
  }

  fetchData = async (activeTabStatus, parentId) => {
    this.setState({ loading: true }, async () => {
      const { routes } = this.state;
      const activeRole = routes[routes.length - 1].name;
      const jsonResponse = await getTableDataDetails(activeTabStatus, activeRole, parentId);
      const response = await jsonResponse.json();
      this.setState({ tableData: response.response, loading: false });
    });
  }

  updateActiveState = e => {
    const { value } = e.target;
    this.setState({
      activeTabStatus: value
    }, () => {
      this.fetchData(
        value,
        this.state.routes[this.state.routes.length - 1].parentId
      )
    });
  };

  onBreadCumbClick = (route) => {
    const oldRoutes = cloneDeep(this.state.routes);
    const clickedLayerIndex = oldRoutes.findIndex(r => r.name === route.name);
    const newRoutes = oldRoutes.splice(0, clickedLayerIndex + 1);
    this.setState({
      routes: newRoutes,
      activeLayerIndex: clickedLayerIndex + 2
    }, this.refetchData);
  }

  itemRender = (route) => (
    <span
      onClick={() => this.onBreadCumbClick(route)}
      className={s.breadcumbStyle}
    >
      {route.breadcrumbName}
    </span>
  )

  onOkClick = (data) => async () => {
    if (data) {
      const { activeLayerIndex } = this.state;
      const role = roles[activeLayerIndex].name;
      const restData = {
        role,
        adminId: auth.getAgentId(),
        parentId: auth.getAgentId(),
        parentRole: auth.getAgentRole()
      };
      const jsonResponse = await createSuperMaster({ ...data, ...restData });
      const response = await jsonResponse.json();
      if (response.success) {
        message.success(`Successfully created the ${role}`);
        this.setState({ showSuperMasterPopup: false }, this.refetchData);
      } else {
        message.error(response.response);
      }
    }
  }

  onCancel = () => {
    this.setState({ showSuperMasterPopup: false });
  }

  updatePopupStatus = (value, user = {}) => this.setState({ showUpdatePopup: value, ...user })

  updateWithDrawDepositPopup = (value, popupType) => this.setState({ showWithDrawDepositPopup: value, ...popupType })

  updateViewSuperMasterPopup = value => this.setState({ showSuperMasterPopup: value })

  onRowClick = (record, index) => {
    const { activeLayerIndex } = this.state;
    if (record && (activeLayerIndex + 1 < roles.length)) {
      this.setState((prevState) => ({
        routes: [
          ...prevState.routes,
          {
            ...roles[prevState.activeLayerIndex + 1],
            parentId: record.currentId
          }
        ],
        activeLayerIndex: prevState.activeLayerIndex + 1,
      }), () => this.fetchData(this.state.activeTabStatus, record.currentId));
    }
  }

  refetchData = () => {
    this.fetchData(
      this.state.activeTabStatus,
      this.state.routes[this.state.routes.length - 1].parentId
    );
  }

  renderTable = (tableData) => {
    const data = formatData(tableData);
    return (
      <Table
        columns={getColumns(
          this.refetchData,
          this.updatePopupStatus,
          this.updateWithDrawDepositPopup,
          this.state.activeTabStatus
        )}
        dataSource={data}
        bordered
        onRow={(record, rowIndex) => ({
          onClick: () => this.onRowClick(record, rowIndex)
        })}
      />
    );
  }

  renderCreatePopUp = activeLayerIndex => (
    <Create
      title={`Create ${roles[activeLayerIndex].breadcrumbName}`}
      onOkClick={this.onOkClick}
      onCancel={this.onCancel}
    />
  )

  render() {
    const {
      loading,
      tableData,
      routes,
      showSuperMasterPopup,
      activeTabStatus,
      showUpdatePopup,
      firstName,
      lastName,
      mobile,
      type,
      userName,
      updateAgentId,
      updateParentId,
      showWithDrawDepositPopup,
      agentRole
    } = this.state;
    const { activeLayerIndex } = this.props;
    if (!tableData) {
      return <Loader />
    }
    return (
      <div>
        {showSuperMasterPopup && this.renderCreatePopUp(activeLayerIndex)}
        {showUpdatePopup && (
            <ChangeUserInfo
              userName={userName}
              firstName={firstName}
              lastName={lastName}
              mobile={mobile}
              agentId={updateAgentId}
              parentId={updateParentId}
              refetchData={this.refetchData}
              updatePopupStatus={this.updatePopupStatus}
              agentRole={agentRole}
            />
          )}
          {
            showWithDrawDepositPopup && (
              <WithDrawDepositPopup
                type={type}
                userName={userName}
                agentId={updateAgentId}
                parentId={updateParentId}
                agentRole={agentRole}
                updateWithDrawDepositPopup={this.updateWithDrawDepositPopup}
              />
            )
          }
        <div className={s.breadcumbWrapper}>
          <Breadcrumb itemRender={this.itemRender} routes={routes} />
        </div>
        <div className={s.headerActionWrapper}>
          <div>
            <Radio.Group value={activeTabStatus} buttonStyle="solid" onChange={this.updateActiveState}>
              <Radio.Button value={1}>Active</Radio.Button>
              <Radio.Button value={0}>Blocked</Radio.Button>
              <Radio.Button value={2}>Locked</Radio.Button>
            </Radio.Group>
          </div>
          {routes.length === 1 && (
            <div>
              <Button
                type="primary"
                onClick={() => this.updateViewSuperMasterPopup(true)}
              >
                Create
              </Button>
            </div>
          )}
        </div>
        {loading ? <Loader /> : (
          <div className={s.tableWrapper}>
            {this.renderTable(tableData)}
          </div>
        )}
      </div>
    );
  }
}