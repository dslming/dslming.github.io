import router from 'umi/router';
import React from 'react';
import Media from 'react-media';
import styles from './index.less';
import { Layout, Menu, Icon } from 'antd';
import enLang from '../locales/en-US/main'
const { Header, Sider, Content } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    collapsed: false,
    lang: enLang
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  
  handleClick(e) {
    switch(e.key) {
      case '1':
      router.push('/Edit');
      break

      case '2':
      router.push('/Design');
      break

      case '3':
        router.push('/AddItems');
        break
    }
  }

  render() {
    return (
      <Layout style={{
        height: '100%'
      }}>
        <Sider style={{  backgroundColor: 'rgba(0, 21, 41, 0.8)', padding: 0, height: '100%' }} trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={this.handleClick}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>{this.state.lang.siderEdit}</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span>{this.state.lang.siderDisign}</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>{this.state.lang.siderAddItems}</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

function BasicLayout(props) {
  return (
    <Media query="(max-width: 1600px)">
      {
        isMobile => 
        <div className={styles.box}>
          <App {...props} />
        </div>
      }
    </Media>
  );
}

export default BasicLayout;