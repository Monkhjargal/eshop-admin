import React from 'react';
import { Form, Select, Row, Col, Button, Transfer, Spin } from "antd";

import styles from "../../styles.less";

const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 },
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
      this.props.onCancel();
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
      // value: item.skunm, // search hesegt haih
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

  handleFilter = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Filter values: ', values);
      }
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  renderFilter = () => {
    try {
      const { getFieldDecorator } = this.props.form;

      return (
        <Row>
          <Form className={styles.otModalForm} onSubmit={this.handleFilter}>
            <Col span={6}>
              <Form.Item {...formItemLayout} label="Барааны ангилал">
                {getFieldDecorator("catid", {
                  initialValue: [],
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<Select
                  allowClear
                  size={"small"}
                  placeholder="Барааны ангилалаар хайх"
                  filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item {...formItemLayout} label="Барааны бренд">
                {getFieldDecorator("brandid", {
                  initialValue: [],
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<Select
                  allowClear
                  size={"small"}
                  placeholder="Барааны брендээр хайх"
                  filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="small" type="button" onClick={this.handleReset} >{'Цэвэрлэх'}</Button>
                <Button size="small" htmlType="submit" type="primary" style={{ marginLeft: 3 }} >{'Хайх'}</Button>
              </Form.Item>
            </Col>

          </Form>
        </Row>
      );
      // eslint-disable-next-line no-unreachable
    } catch (error) {
      return error;
    }
  };

  render() {
    // console.log(this.props);
    // const { getFieldDecorator } = this.props.form;
    const { loading } = this.state;

    if (!loading) {
      return (
        <div style={{ width: '100%' }}>
          <div>{this.renderFilter()}</div>

          <Transfer
            showSearch
            titles={['Сонгогдоогүй бараа', 'Сонгогдсон бараа']}
            dataSource={this.state.unselected}
            listStyle={{
              width: '47%',
              height: 500,
            }}
            filterOption={(inputValue, option) => option.catnm.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1 || option.skunm.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
            targetKeys={this.state.selected}
            onChange={this.handleChange}
            render={item => `${item.skucd} - ${item.skunm} - ${item.catnm}`}
          />

          <div className={styles.stepSaveBtn}>
            <Button onClick={this.props.prevStep} style={{ marginRight: 5 }}>Болих</Button>
            <Button type="primary" onClick={this.handleSave}>
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
