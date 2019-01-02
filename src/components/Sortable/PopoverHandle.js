import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Icon } from 'antd';

import PopoverContent from './PopoverContent';

const PopoverHandle = props => (
  <Dropdown
    overlay={PopoverContent({
      onEdit: props.onEdit,
      onDelete: props.onDelete,
      item: props.item,
      idx: props.idx,
    })}
    trigger={['click']}
  >
    <Icon style={{ cursor: 'pointer' }} type="ellipsis" />
  </Dropdown>
);

PopoverHandle.propTypes = {
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  item: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired,
};

PopoverHandle.defaultProps = {
  onDelete: () => {},
  onEdit: () => {},
};

export default PopoverHandle;
