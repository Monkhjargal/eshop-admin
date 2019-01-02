import React from 'react';
import { List } from '../../components';
import PageHeaderLayout from "../../layouts/PageHeaderLayout";
// import { StylesManager } from 'survey-react';
// import { styles } from './style.less';

const divStyle = {
  width: '90%',
};

export default () => (
  <PageHeaderLayout title="List information" style={divStyle}>
    <List
      actions={['create', 'update']}
      model={'Widgetslist'}
      name={'Widget'}
    />
  </PageHeaderLayout>
);
