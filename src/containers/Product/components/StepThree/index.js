import React from 'react';
import { Form, Input, Row, Col, Button, Transfer } from "antd";

import styles from "../../styles.less";

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

class Component extends React.Component {
  state = {
    unselected: [],
    selected: [],
  }

  componentDidMount() {
    this.getMock();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleSave = () => {
    console.log(this.state.selected);
  }

  handleChange = (selected) => {
    // console.log(targetKeys, direction, moveKeys);
    this.setState({ selected });
  }

  renderItem = (item) => {
    const customLabel = (
      <span className="custom-item">
        {item.skucd} - {item.skunm} - {item.catnm}
        {/* <text className="t-skucd">{item.skucd}</text>
        <text className="t-skunm">{item.skunm}</text>
        <text className="t-catnm">{item.catnm}</text> */}
      </span>
    );

    return {
      label: customLabel, // for displayed item
      value: item.skucd, // search hesegt haih
    };
  }

  getMock = () => {
    const { product } = this.props;
    const selected = [];
    const unselected = [];
    // console.log(product);

    product.map((item) => {
      const data = {
        key: item.skucd,
        skucd: `${item.skucd}`,
        skunm: `${item.skunm}`,
        catnm: `${item.catnm}`,
      };
      // if (data.chosen) {
      //   targetKeys.push(data.key);
      // }
      unselected.push(data);
      return item;
    });
    this.setState({ unselected, selected });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ width: '100%' }}>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col span={7}>
              <Form.Item {...formItemLayout} label="Ангилал">
                {getFieldDecorator('category', { rules: [{ required: false }] })(
                  <Input />)}
              </Form.Item>
            </Col>

            <Col span={7}>
              <Form.Item {...formItemLayout} label="Бренд">
                {getFieldDecorator('brand', { rules: [{ required: false }] })(
                  <Input />)}
              </Form.Item>
            </Col>

            <Col span={4}>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                >
                  хайх
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <Transfer
          showSearch
          titles={['Сонгогдоогүй бараа', 'Сонгогдсон бараа']}
          dataSource={this.state.unselected}
          listStyle={{
          width: '47%',
          height: 500,
        }}
          targetKeys={this.state.selected}
          onChange={this.handleChange}
          render={this.renderItem}
        />

        <div className={styles.stepSaveBtn}>
          <Button type="primary" onClick={this.handleSave}>Хадгалах</Button>
        </div>
      </div>
    );
  }
}

const StepThree = Form.create({ name: 'product' })(Component);
export default StepThree;
