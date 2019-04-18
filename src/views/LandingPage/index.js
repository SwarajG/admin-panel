import React, { Component } from 'react';
import { Layout, Menu, Dropdown, Icon } from 'antd';
import { navBar } from '../../utils/enums';
import auth from '../../utils/auth';
import { renderContentPage } from '../ContentPage';
import s from './styles';

const {
  Header, Content, Footer, Sider,
} = Layout;

export default class LandingPage extends Component {

  state = {
    selectedKeys: ['Dashboard']
  }

  onSelectedMenuChange = (key) => this.setState({ selectedKeys: [key] })

  renderMenuItem = item => (
    <Menu.Item key={navBar[item]} onClick={() => this.onSelectedMenuChange(navBar[item])}>
      <span className="nav-text">{navBar[item]}</span>
    </Menu.Item>
  )

  renderMenu = () => (
    <Menu>
      <Menu.Item key="0">
        <p className={s.menuText}>
          Change Password
        </p>
      </Menu.Item>
      <Menu.Item key="0">
        <p className={s.menuText}
          onClick={() => auth.logout(() => {
            window.location.href = '/';
          })}
        >
          Logout
        </p>
      </Menu.Item>
    </Menu>
  )

  render() {
    const { selectedKeys } = this.state;
    const authUser = auth.getUser();
    const user = authUser && authUser.response;
    const { aclDetails } = user;
    return (
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          width={256}
        >
          <div className={s.logo}>
            <h1 className={s.name}>{user.agent.userName}</h1>
          </div>
          <Menu theme="dark" mode="inline" selectedKeys={selectedKeys}>
            {aclDetails.map(this.renderMenuItem)}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <div className={s.headerWrapper}>
              <p className={s.headerName}>{user.agent.firstName} {user.agent.lastName}</p>
              <Dropdown overlay={() => this.renderMenu()} trigger={['click']}>
                <Icon type="user" />
              </Dropdown>
            </div>
          </Header>
          <Content>
            <div style={{ padding: 24, minHeight: 360 }}>
              {renderContentPage(selectedKeys[0])}
            </div>
          </Content>
        </Layout>
      </Layout>
    )
  }
}