import React from 'react';
import { Form, Input, Row, Col, Button, Transfer, Spin } from "antd";

import styles from "../../styles.less";

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

class Component extends React.Component {
  state = {
    unselected: [],
    selected: [],
    relational: [],
    loading: true,
  }

  componentWillMount() {
    this.props.getRelational({ skucd: this.props.skucd }).then((res) => {
      this.setState({
        loading: false,
        relational: this.props.relational,
      });
      this.getMock();
    });
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
    this.setState({ loading: true });
    this.props.updateRelational({ body: this.state.selected, parentskucd: this.props.skucd }).then((res) => {
      this.setState({ loading: false });
    });
  }

  handleChange = (selected) => {
    this.setState({ selected });
  }

  renderItem = (item) => {
    const customLabel = (
      <span className="custom-item">
        {item.skucd} - {item.skunm} - {item.catnm}
      </span>
    );
    return {
      label: customLabel, // for displayed item
      value: item.skucd, // search hesegt haih
    };
  }

  getMock = () => {
    const { relational } = this.props;
    const selected = [];
    const unselected = [];

    relational.map((item) => {
      const data = {
        key: item.skucd,
        skucd: `${item.skucd}`,
        skunm: `${item.skunm}`,
        catnm: `${item.catnm}`,
        chosen: `${item.state}`,
      };
      if (data.chosen === '1') { selected.push(data.key); }

      return unselected.push(data);
    });

    this.setState({ unselected, selected });
  }

  render() {
    // console.log(this.props);
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.state;

    if (!loading) {
      return (
        <div style={{ width: '100%' }}>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              {/* <Col span={7}>
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
              </Col> */}

              {/* <Col span={4}>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                  >
                    хайх
                  </Button>
                </Form.Item>
              </Col> */}
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
            <Button type="primary" onClick={this.handleSave} disabled={this.state.selected.length === 0}>
              Хадгалах
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div style={{ marginLeft: '49%', paddingTop: '15%', paddingBottom: '15%' }}><Spin /></div>
    );
  }
}

const StepThree = Form.create({ name: 'product' })(Component);
export default StepThree;
