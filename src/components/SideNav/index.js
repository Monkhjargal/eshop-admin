import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {
  Menu,
  Icon,
  Badge,
} from 'antd';

import styles from "./index.less";

const { SubMenu } = Menu;

const mapStateToProps = state => ({ state });

class SideNav extends PureComponent {
  static defaultProps = {
  };

  static propTypes = {
    location: PropTypes.object.isRequired,
    menus: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.menus = props.menus;
    this.state = {
      openKeys: this.getDefaultCollapsedSubMenus(props),
    };
  }

  getDefaultCollapsedSubMenus(props) {
    const currentMenuSelectedKeys = [...this.getCurrentMenuSelectedKeys(props)];
    currentMenuSelectedKeys.splice(-1, 1);
    if (currentMenuSelectedKeys.length === 0) {
      return ['dashboard'];
    }
    return currentMenuSelectedKeys;
  }

  getCurrentMenuSelectedKeys(props) {
    const { location: { pathname } } = props || this.props;
    const keys = pathname.split('/').slice(1);
    if (keys.length === 1 && keys[0] === '') {
      return [this.menus[0].key];
    }
    return keys;
  }

  getNavMenuItems(menusData, parentPath = '') {
    if (!menusData) {
      return [];
    }
    return menusData.map((item) => {
      if (!item.name) {
        return null;
      }
      let itemPath;
      if (item.path.indexOf('http') === 0) {
        itemPath = item.path;
      } else {
        itemPath = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
      }
      if (item.children && item.children.some(child => child.name)) {
        return (
          <SubMenu
            title={
              item.icon ? (
                <span>
                  <Icon type={item.icon} />
                  <span>{item.name}</span>
                </span>
              ) : item.name
            }
            key={item.key || item.path}
          >
            {this.getNavMenuItems(item && item.children, itemPath)}
          </SubMenu>
        );
      }
      const icon = item.icon && <Icon type={item.icon} />;

      return (
        <Menu.Item key={item.key || item.path}>
          {
            /^https?:\/\//.test(itemPath) ? (
              <a href={itemPath} target={item.target}>
                {icon}
                <span>
                  {item.name}
                </span>
              </a>
            ) : (
              <Link
                to={itemPath}
                target={item.target}
                replace={itemPath === this.props.location.pathname}
              >
                {icon}
                <span>
                  {item.path === 'emergency' ? <Badge dot className={styles.badge}>{item.name}</Badge> : item.name}
                </span>
              </Link>
              )
          }
        </Menu.Item>
      );
    });
  }

  rootSubmenuKeys = ['category', 'settings', 'products'];
  state = {
    openKeys: ['category'],
  };

  handleOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }

  render() {
    const {
      collapsed,
    } = this.props;
    const menuProps = collapsed ? {} : {
      openKeys: this.state.openKeys,
    };
    return (
      <Menu
        defaultSelectedKeys={this.getCurrentMenuSelectedKeys()}
        defaultOpenKeys={['category']}
        onOpenChange={this.handleOpenChange}
        mode="inline"
        theme="light"
        {...menuProps}
        inlineCollapsed
      >
        {this.getNavMenuItems(this.menus)}
      </Menu>
    );
  }
}

export default withRouter(connect(mapStateToProps)(SideNav));
