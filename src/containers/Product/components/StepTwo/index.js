import React from 'react';
import { Form, Select, Row, Col, Button, Spin } from "antd";

import styles from '../../styles.less';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 15 },
};

class Component extends React.Component {
    state = {
      attribute: null,
      value: 201,
    }

    componentDidMount() {
    //   this.setState({ attribute: null });
      this.props.getAttribute({ skucd: this.props.skucd });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        // console.log('Received values of form: ', values);
        this.props.updateAttr({ body: values, skucd: this.props.skucd });
      });
    }

    render() {
      const { getFieldDecorator } = this.props.form;
      const { attribute } = this.state;

      if (this.props.attribute !== this.state.attribute) {
        this.setState({ attribute: this.props.attribute });
      }

      // console.log(attribute);

      if (attribute !== null && attribute.categoryattributes !== undefined) {
        return (
          <div style={{ width: '100%' }} className={styles.otModalForm}>
            <Form onSubmit={this.handleSubmit}>
              <Row>
                {attribute.categoryattributes.map(i => (
                  <Col span={12} key={i.key}>
                    <Form.Item {...formItemLayout} label={i.label} >
                      {getFieldDecorator(`${i.name}`, {
                                initialValue: `${attribute.productattributes.find(k => k.attrid === i.key).attrvalueid}`,
                                rules: [{ required: false }],
                            })(
                              <Select
                                size={'small'}
                                style={{ width: '96%' }}
                              >
                                {i.options.map(j => <Select.Option key={j.id}>{j.name}</Select.Option>)}
                              </Select>,
                            )}
                    </Form.Item>
                  </Col>
                ))}
              </Row>
              <Form.Item className={styles.stepSaveBtn}>
                <Button type="primary" htmlType="submit">Хадгалах</Button>
              </Form.Item>
            </Form>
          </div>
        );
      }

      return <div style={{ marginLeft: '49%', paddingTop: '15%', paddingBottom: '15%' }}><Spin /></div>;
    }
}

const StepTwo = Form.create({ name: 'product' })(Component);
export default StepTwo;


Component.defaultProps = {
  attribute: null,
};
