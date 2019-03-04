import React from 'react';
import { List } from '../../components';
import PageHeaderLayout from "../../layouts/PageHeaderLayout";

const divStyle = {
  width: '90%',
  overflow: 'hidden',
};

export default () => (
  <PageHeaderLayout title="Infotrans information" style={divStyle}>
    <List
      actions={[]}
      model={'Infotrans'}
      name={'Infotrans'}
    />
  </PageHeaderLayout>
);
