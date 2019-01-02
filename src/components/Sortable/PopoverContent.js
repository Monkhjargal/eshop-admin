import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';
// import styles from './index.less';

const { Item } = Menu;

const PopoverContent = props => (
  <Menu>
    <Item key="0">
      <a onClick={() => props.onEdit(props.item, props.idx)}>
        <Icon type="edit" /> Засах
      </a>
    </Item>
    <Item key="1">
      <a onClick={() => props.onDelete(props.item, props.idx)}>
        <Icon type="delete" /> Устгах
      </a>
    </Item>
  </Menu>
);

PopoverContent.propTypes = {
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  item: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired,
};

PopoverContent.defaultProps = {
  onEdit: () => {},
  onDelete: () => {},
};

export default PopoverContent;
