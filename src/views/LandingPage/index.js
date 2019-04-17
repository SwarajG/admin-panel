import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
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
        >
          <div className={s.logo} />
          <Menu theme="dark" mode="inline" selectedKeys={selectedKeys}>
            {['DASHBOARD'].concat(aclDetails).map(this.renderMenuItem)}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {renderContentPage(selectedKeys[0])}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    )
  }
}