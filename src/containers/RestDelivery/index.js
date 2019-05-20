import React from 'react';
import { List } from '../../components';
import PageHeaderLayout from "../../layouts/PageHeaderLayout";

const divStyle = {
  width: '90%',
  overflow: 'hidden',
};

export default () => (
  <PageHeaderLayout title="Un delivery day" style={divStyle}>
    <List
      actions={['create', 'update', 'delete']}
      model={'RestDelivery'}
      name={'RestDelivery'}
      // filter
    />
  </PageHeaderLayout>
);
