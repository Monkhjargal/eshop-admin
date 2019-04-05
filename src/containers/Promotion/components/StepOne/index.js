import React from "react";
import { Form, Input, Checkbox } from "antd";

const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 12 },
};

class Step extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        values.isenable = values.isenable === undefined ? false : values.isenable;
        // console.log('Received values of form: ', { ...values, skucds: [] });
        this.props.create({ body: { ...values, skucds: [] } })
          .then((res) => {
            this.setState({ loading: false });
            this.props.onCancel();
            this.props.refresh();
          });
      }
    });
  }

  getAlert() {
    console.log('====================================');
    console.log('asds');
    console.log('====================================');
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div style={{ width: '100%' }}>
        <Form>
          <Form.Item
            {...formItemLayout}
            label="Суртачилгааны ангилал: "
          >
            {getFieldDecorator('promotnm', {
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
              rules: [{ required: false }],
              })(
                <Checkbox defaultChecked={false} />,
            )}
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const StepOne = Form.create({ name: 'create_promotion' })(Step);
export default StepOne;
