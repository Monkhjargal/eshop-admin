/**
 * COMPONENT NAME:                                      ORDER AMOUNT CHNAGE AND HISTORY
 * CREATED BY:                                          **BATTSOGT BATGERELT**
 * CREARED DATED:                                       2019-04-19
 * DESCRIPTION:
 */

import React from 'react';
import { Modal, Table } from 'antd';

const formatter = new Intl.NumberFormat("en-US");

class Component extends React.Component {
  render() {
    return (
      <Modal
        title="Захиалгын төлөв өөрчлөлтийн түүх"
        visible={this.props.visible}
        footer={null}
        onCancel={this.props.onCancel}
        onOk={this.props.onCancel}
        width={'40%'}
        destroyOnClose
      >
        <Content {...this.props} />
      </Modal>
    );
  }
}

export default Component;

// eslint-disable-next-line react/no-multi-comp
class Content extends React.Component {
  state = {
    data: [],
    loading: true,
  }

  componentWillMount() {
    this.props.getAmountHistory({ id: this.props.id })
      .then((res) => {
        this.setState({ data: this.props.data, loading: false });
      });
  }

  render() {
    const { loading, data } = this.state;

    const columns = [{
      title: 'Захиалга огноо',
      dataIndex: 'orddate',
      key: 'orddate',
    }, {
      title: 'Захиалга №',
      dataIndex: 'insymd',
      key: 'insymd',
    }, {
      title: 'Тайлбар',
      dataIndex: 'description',
      key: 'description',
    }, {
      title: 'Захиалгын төлөв',
      dataIndex: 'status',
      key: 'status',
    }, {
      title: 'Хэрэглэгч',
      dataIndex: 'user',
      key: 'user',
    }, {
      title: 'Систем',
      dataIndex: 'sys',
      key: 'sys',
    }];

    return (
      <Table
        bordered
        size={'small'}
        loading={loading}
        dataSource={data}
        columns={columns}
        footer={null}
        pagination={false}
      />
    );
  }
}
