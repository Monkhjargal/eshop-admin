import React from 'react';
import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import { List } from '../../components';

const divStyle = {
  width: '90%',
};

export default () => (
  <PageHeaderLayout title="AttributeValue information" style={divStyle} >
    <List
      actions={['create', 'update', 'delete']}
      model={'AttributeValue'}
      name={'Аттрибутын утга'}
    />
  </PageHeaderLayout>

);
