import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { Form, Input, Checkbox, Button, Icon } from "antd";
import styles from "../../styles.less";

const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 12 },
};

class Step extends React.Component {
  componentDidMount() { this.props.onRef(this); }
  componentWillUnmount() { this.props.onRef(null); }

  handleSubmit = (e, isprev) => {
    if (!isprev) { e.preventDefault(); }
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log(values);
        values.isenable = values.isenable === undefined ? false : values.isenable;
        // console.log(values);
        this.props.getValue(values);
      }
    });
  }

  render() {
    // console.log(this.props);
    const { getFieldDecorator } = this.props.form;

    return (
      <div style={{ width: '100%' }}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item
            {...formItemLayout}
            label="Улирлын цэсны нэр: "
          >
            {getFieldDecorator('promotnm', {
              initialValue: `${this.props.defValue.length === 0 ? '' : this.props.defValue.promotnm}`,
              rules: [{ required: true, message: 'Заавал бөглөнө үү!' }],
              })(
                <Input />,
            )}

          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="Идэвхитэй эсэх: "
          >
            {getFieldDecorator('isenable', {
              initialValue: `${this.props.defValue.length === 0 ? false : this.props.defValue.isenable}`,
              rules: [{ required: false }],
              })(
                <Checkbox defaultChecked={this.props.defValue.length === 0 ? false : this.props.defValue.isenable} />,
            )}
          </Form.Item>
          <Form.Item className={styles.stepSaveBtn}>
            <Button type="primary" htmlType="submit"><Icon type="arrow-right" /></Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const StepOne = Form.create({ name: 'create_promotion' })(Step);
export default StepOne;
