import React from "react";
import { Form, Input, Spin, Col, Table } from "antd";

import styles from "../../styles.less";
import styleTable from "../../../../components/StandardTable/index.less";

const halfItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const columns = [{
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
              <Input disabled value={this.props.skucd} className={styles.disabled} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item {...halfItemLayout} label="Онлайн нэр">
              <Input disabled value={this.props.name} className={styles.disabled} />
            </Form.Item>
          </Col>

          <div className={styleTable.subTable}>
            <Table
              bordered
              size="small"
              columns={columns}
              dataSource={this.props.statusHistory}
              pagination={{
                defaultPageSize: 15,
                showSizeChanger: true,
                showQuickJumper: true,
                pageSizeOptions: ['50', '100', '200'],
              }}
            />
          </div>
        </div>
      );
    }

    return (
      <div style={{ marginLeft: '49%', paddingTop: '15%', paddingBottom: '15%' }}><Spin /></div>
    );
  }
}

export default Component;
