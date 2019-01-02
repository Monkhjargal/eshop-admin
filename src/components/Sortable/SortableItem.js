import React from 'react';
import PropTypes from 'prop-types';
import { SortableElement } from 'react-sortable-hoc';
import PopoverHandle from './PopoverHandle';
import DragHandle from './DragHandle';
import styles from './index.less';

const questionEnum = {
  radio: 'Уламжлалт асуулт',
  input: 'Бичиж хариулах асуулт',
  custom: 'Сонголттой асуулт',
};

const SortableItem = props => (
  <div className={styles.stylizedItem}>
    <div className={styles.contentWrapper}>
      <div className={styles.rowContainer}>
        {/* <div className={styles.rLabel}>Асуултын төрөл:</div> */}
        <div className={styles.rValue1}>{questionEnum[props.item.type]}</div>
      </div>
      <div className={styles.rowContainer}>
        {/* <div className={styles.rLabel}>Асуулт:</div> */}
        <div className={styles.rValue}>{props.item.name}</div>
      </div>
    </div>
    <div className={styles.catAction}>
      <PopoverHandle
        onEdit={props.onEdit}
        item={props.item}
        onDelete={props.onDelete}
        idx={props.idx}
      />
      <DragHandle />
    </div>
  </div>
);

SortableItem.propTypes = {
  item: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

SortableItem.defaultProps = {
  onEdit: () => {},
  onDelete: () => {},
};

export default SortableElement(SortableItem);
