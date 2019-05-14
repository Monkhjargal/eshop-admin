import React from 'react';
import { Form, Spin, Row, Icon, Button, Transfer, Select, Col } from "antd";

import styles from "../../styles.less";

const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 },
};

class Component extends React.Component {
  state = {
    unselected: [],
    selected: [],
    loading: true,
    bloading: false,
  }

  componentWillMount() {
    this.props.getProduct({ id: this.props.id })
      .then((res) => {
        this.setState({ loading: false });
        this.renderProduct();
      });
  }

  renderProduct = () => {
    const { product } = this.props;
    const selected = [];
    const unselected = [];

    product.data.map((item) => {
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

  handleSave = () => {
    this.setState({ bloading: true });
    this.props.updateProduct({ body: this.state.selected, id: this.props.id })
      .then(res => this.setState({ bloading: false }));
    this.props.onCancel();
  }

  handleChange = (selected) => {
    // console.log(targetKeys, direction, moveKeys);
    this.setState({ selected });
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
            <Col span={8}>
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
            <Col span={8}>
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
            <Col span={8}>
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
    // console.log('STEP RWO FORM DATA', this.props);
    const {
      selected, unselected, loading, bloading,
    } = this.state;
    return (
      <Row style={{ width: '100%', marginTop: 25 }}>
        <div>{this.renderFilter()}</div>
        {
          !loading ? (
            <Transfer
              showSearch
              titles={['Сонгогдоогүй бараа', 'Сонгогдсон бараа']}
              dataSource={unselected}
              listStyle={{
                width: '47%',
                height: 500,
              }}
              targetKeys={selected}
              onChange={this.handleChange}
              render={item => `${item.skucd} - ${item.skunm} - ${item.catnm}`}
              filterOption={(inputValue, option) => option.catnm.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1 || option.skunm.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1 || option.skucd.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
            />
          ) : (
            <div style={{ marginLeft: '49%', paddingTop: '15%', paddingBottom: '15%' }}><Spin /></div>
          )
        }

        <div className={styles.stepSaveBtn}>
          <Button type="dashed" onClick={this.props.prevStep}><Icon type="arrow-left" /></Button>{' '}
          <Button type="primary" onClick={this.handleSave} loading={bloading} >Хадгалах</Button>
        </div>
      </Row>
    );
  }
}

const StepTwo = Form.create({ name: 'product' })(Component);
export default StepTwo;
