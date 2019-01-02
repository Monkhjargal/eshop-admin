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
      if (current.children) {
        current.children.forEach((entry) => {
          entry.realPath = `/${current.path}/${entry.path}`;
        });
        arr = [...arr, ...current.children];
      } else {
        current.realPath = `/${current.path}`;
        arr = [...arr, current];
      }
      return arr;
    }, []);

    this.state = {
      isLoaded: false,
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

  render() {
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]}>
        <Menu.Item disabled><Icon type="user" />Профайл</Menu.Item>
        <Menu.Item disabled><Icon type="setting" />Тохиргоо</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <a onClick={() => this.props.logout()}>
            <Icon type="logout" />Гарах
          </a>
        </Menu.Item>
      </Menu>
    );

    return this.state.isLoaded &&
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute>
          {params => (
            <div className={classNames(params)} style={{ height: '100%' }}>
              <Layout style={{ height: '100%' }}>
                <Sider className={styles.sider}>
                  <Header className={styles.header}>
                    <div className={styles.logo}>
                      <Link to="/">
                        <img src={otLogo} alt=' "emart" logo' />
                      </Link>
                    </div>
                    <div>
                      <Badge className={styles.logout}>
                        <Avatar shape="square" icon="user" />
                      </Badge>
                      <span> {this.props.auth.data.value.userInfo.lastname}</span>
                    </div>
                    <SideNav menus={this.menus} />
                  </Header>
                </Sider>
                <Layout style={{ height: '100%' }}>
                  <Content style={{ height: 'calc(100% - 21px)' }} className="main-content">
                    <div style={{ minHeight: '100%' }}>
                      <div className={styles.topmenus}>
                        <span style={{ marginRight: 24 }}>
                          <a onClick={() => this.props.logout()} className={styles.logoutbutton}>
                            {/* <Badge className={styles.logout}>
                              <Avatar shape="square" icon="logout" />
                            </Badge> */}
                            <span> Гарах <Icon type="logout" /> </span>
                          </a>
                        </span>
                      </div>
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
          )}
          {/* </ContainerQuery> */}
        </PrivateRoute>
      </Switch>;
  }
}

App.propTypes = {
  auth: PropTypes.object.isRequired,
  // menus: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, { logout: Auth.logout })(App);
