import React from 'react';
import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import { List } from '../../components';

const divStyle = {
  width: '100%',
};

export default () => (
  <PageHeaderLayout title="Label information" style={divStyle} >
    <List
      actions={['update']}
      model={'LabelList'}
      name={'Label'}
    />
  </PageHeaderLayout>
);
