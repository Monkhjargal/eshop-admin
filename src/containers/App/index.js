// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon, Avatar, Badge } from 'antd';
import classNames from 'classnames';
import { GlobalFooter, SideNav, PrivateRoute } from '../../components';
import { Main, Login } from '../';
import { Auth } from '../../models';
import styles from './style.less';
import { getNavData } from '../../common/nav';
import otLogo from "../../assets/images/emart-logo.png";

const { SubMenu } = Menu;

const {
  Header,
  Content,
  Sider,
} = Layout;

const mapStateToProps = (state) => {
  const { auth } = state;
  return {
    auth,
  };
};

class App extends Component {
  constructor(props) {
    super(props);
    this.menus = getNavData;
    this.routes = getNavData.reduce((arr, current) => {
      if (current.children && current.children) {
        current.children.forEach((entry) => {
          entry.realPath = `/${current.path}/${entry.path}`;
        });
        arr = [...arr, ...current.children];
      } else {
        current.realPath = `/${current.path}`;
        arr = [...arr, current];
      }
      // console.log(current);
      // console.log(arr);
      return arr;
    }, []);

    this.state = {
      isLoaded: false,
      collapsed: false,
    };
  }

  componentWillMount() {
    if (!this.state.isLoaded) {
      this.setState({ isLoaded: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.isLoaded && this.props.auth.isLoading === true && nextProps.auth.isLoading === false) {
      this.setState({ isLoaded: true });
    }
    if (this.props.auth && this.props.auth.isLogged === true && nextProps.auth.isLogged === false) {
      this.props.history.push('/login');
    }
  }

  onCollapse = (collapsed) => { this.setState({ collapsed }); }

  render() {
    console.log(this.props.auth);
    return this.state.isLoaded &&
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute>
          <div style={{ height: '100%' }}>
            <Layout style={{ height: '100%' }}>
              <Sider
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
                theme="light"
                className="sdsd"
              >
                <div className={styles.logo}>
                  <Link to="/">
                    <img src={otLogo} alt=' "emart" logo' />
                  </Link>
                </div>
                <SideNav menus={this.menus} />
              </Sider>
              <Layout style={{ height: '100%' }}>
                <Content style={{ height: 'calc(100% - 21px)' }} className="main-content">
                  <div style={{ minHeight: '95%' }}>
                    <Menu mode="horizontal" style={{ textAlign: 'right', display: 'flex', justifyContent: 'flex-end' }}>
                      <SubMenu title={<span className="submenu-title-wrapper"><Icon type="user" />{this.props.auth.data.success ? this.props.auth.data.value.userInfo.lastname : ''} </span>}>
                        <Menu.Item key="profile">
                          <a className={styles.logoutbutton}>
                            <span> <Icon type="home" />  Профайл </span>
                          </a>
                        </Menu.Item>
                        <Menu.Item key="logout">
                          <a onClick={() => this.props.logout()} className={styles.logoutbutton}>
                            <span> <Icon type="logout" />  Гарах </span>
                          </a>
                        </Menu.Item>
                      </SubMenu>
                    </Menu>
                    <Main getRouteData={this.routes} />
                  </div>
                  <GlobalFooter
                    copyright={
                      <div>
                          Copyright <Icon type="copyright" /> 2018 Datacare
                      </div>
                      }
                  />
                </Content>
              </Layout>
            </Layout>
          </div>
        </PrivateRoute>
      </Switch>;
  }
}

App.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, { logout: Auth.logout })(App);
