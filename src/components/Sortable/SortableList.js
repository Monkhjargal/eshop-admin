import React from 'react';
import PropTypes from 'prop-types';
import { SortableContainer } from 'react-sortable-hoc';
import SortableItem from './SortableItem';
import styles from './index.less';

const SortableList = props => (
  <div className={styles.stylizedList}>
    {props.items.map((item, index) => (
      <SortableItem
        onDelete={props.onDelete}
        onEdit={props.onEdit}
        key={item.id ? `item-${item.id}` : `item-${index}`}
        index={index}
        idx={index}
        item={item}
      />
      ))}
  </div>
);

SortableList.propTypes = {
  items: PropTypes.array.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

SortableList.defaultProps = {
  onEdit: () => {},
  onDelete: () => {},
};

export default SortableContainer(SortableList);
