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
        title="Төлбөр төлөлтийн түүх"
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
      title: 'Төлсөн дүн',
      dataIndex: 'amount',
      key: 'amount',
      render: text => <span style={{ float: 'right' }}>{formatter.format(text)}</span>,
    }, {
      title: 'Огноо',
      dataIndex: 'insymd',
      key: 'insymd',
    }, {
      title: 'Банк',
      dataIndex: 'banknm',
      key: 'address',
    }, {
      title: 'Тайлбар',
      dataIndex: 'description',
      key: 'description',
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
