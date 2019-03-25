import React from 'react';
import { Col, Form, Select, Input, Button } from 'antd';

import styles from "../../styles.less";

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 17 },
};

const formTailLayout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

class StepNeg extends React.Component {
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.props.nextStep(values);
        }
      });
    }
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <Form onSubmit={this.handleSubmit} style={{ width: '100%' }}>
          <Col span={24}>
            <Form.Item {...formItemLayout} className={styles.formItem} label="Өөрчлөх төлөв">
              {getFieldDecorator('status', {
            rules: [{
              required: true,
              message: 'Өөрчлөх төлөвөө заавал оруулна уу!',
            }],
      })(
        <Select
          style={{ width: '100%' }}
          placeholder="Өөрчлөх төлөв"
        >
          <Select.Option value="1">{'Худалдана -> Түр худалдахгүй'}</Select.Option>
          <Select.Option value="2">{'Түр худалдахгүй -> Худалдана'}</Select.Option>
        </Select>,
      )}
            </Form.Item>
            <Form.Item {...formItemLayout} className={styles.formItem} label="Тайлбар">
              {getFieldDecorator('reason', {
            rules: [{
              required: true,
              message: 'Тайлбараа заавал оруулна уу!',
            }],
          })(
            <Input.TextArea rows={4} />,
          )}
            </Form.Item>

            <Form.Item {...formTailLayout} style={{ margin: '4%' }}>
              <Button type="primary" htmlType="submit" style={{ float: 'right', marginLeft: '5px' }}>{`Дараагийнхруу шилжих`}</Button>{` `}
              <Button onClick={this.props.onCancel} style={{ float: 'right', marginLeft: 5 }}>{`Болих`}</Button>
            </Form.Item>
          </Col>
        </Form>
      );
    }
}

const StepOne = Form.create({ name: 'stepone' })(StepNeg);
export default StepOne;

