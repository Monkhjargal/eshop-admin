import React from 'react';
import { List } from '../../components';
import PageHeaderLayout from "../../layouts/PageHeaderLayout";

export default () => (
  <PageHeaderLayout title="Категорын мэдээлэл" style={{ width: '100%', overflow: 'hidden' }}>
    <List
      actions={['create', 'update', 'delete']}
      model={'Category'}
      name={'Категори'}
    />
  </PageHeaderLayout>
);
