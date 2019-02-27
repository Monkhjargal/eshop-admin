import React from 'react';
import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import { List } from '../../components';

const divStyle = {
  width: '100%',
};

export default () => (
  <PageHeaderLayout title="Color information" style={divStyle} >
    <List
      actions={['create', 'delete']}
      model={'Color'}
      name={'color'}
    // filter
    />
  </PageHeaderLayout>
);
