import React from "react";
import { Form, Input, Spin, Col, Table } from "antd";

const halfItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const columns = [{
  title: 'Эхлэх',
  dataIndex: 'sdate',
  key: 'sdate',
}, {
  title: 'Дуусах',
  dataIndex: 'edate',
  key: 'edate',
}, {
  title: 'Төлөв',
  dataIndex: 'status',
  key: 'status',
}, {
  title: 'Тайлбар',
  dataIndex: 'reason',
  key: 'reason',
}, {
  title: 'Өөрчилсөн',
  dataIndex: 'insemp',
  key: 'insemp',
}, {
  title: 'Өөрчилсөн огноо',
  dataIndex: 'insymd',
  key: 'insymd',
}];

class Component extends React.Component {
  state = {
    loading: true,
    data: [],
  }

  componentDidMount() {
    this.props.getStatusHistory({ skucd: this.props.skucd }).then((res) => {
      console.log('PRODUCT STATUS CHANGE HISTORY PROPS', this.props);
      this.setState({
        loading: false,
      });
    });
  }

  render() {
    if (!this.state.loading) {
      return (
        <div>
          <Col span={12}>
            <Form.Item {...halfItemLayout} label="Барааны код">
              <Input disabled value={this.props.skucd} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item {...halfItemLayout} label="Онлайн нэр">
              <Input disabled value={this.props.name} />
            </Form.Item>
          </Col>

          <Table columns={columns} dataSource={this.props.statusHistory} />
        </div>
      );
    }

    return (
      <div style={{ marginLeft: '49%', paddingTop: '15%', paddingBottom: '15%' }}><Spin /></div>
    );
  }
}

export default Component;
