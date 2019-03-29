import React from 'react';
import { List } from '../../components';
import PageHeaderLayout from "../../layouts/PageHeaderLayout";

const divStyle = {
  width: '90%',
  overflow: 'hidden',
};

export default () => (
  <PageHeaderLayout title="StaticPage information" style={divStyle}>
    <List
      actions={['create', 'update']}
      model={'Static'}
      name={'StaticPage'}
    />
  </PageHeaderLayout>
);
