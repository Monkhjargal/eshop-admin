import React from 'react';
import { SortableHandle } from 'react-sortable-hoc';
import dragImage from '../../assets/images/drag-reorder.png';
import styles from './index.less';

const DragHandle = () => (
  <div className={styles.handle}>
    <img src={dragImage} width="20" alt="" />
  </div>
);

export default SortableHandle(DragHandle);
