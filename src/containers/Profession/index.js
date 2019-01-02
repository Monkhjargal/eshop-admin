import React from 'react';
import { List } from '../../components';
import PageHeaderLayout from "../../layouts/PageHeaderLayout";

export default () => (
  <PageHeaderLayout title="Мэргэжил бүртгэл">

    <List
      actions={['create', 'update', 'delete']}
      model={'Profession'}
      name={'Мэргэжил'}
    />

  </PageHeaderLayout>
);
