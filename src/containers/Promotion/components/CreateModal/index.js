import React from "react";
import { Modal, Form, Input, Checkbox, Button } from "antd";
import styles from "../../styles.less";

const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 12 },
};

class Component extends React.Component {
  state = {
    loading: false,
  }

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

  render() {
    // console.log("PROMOTION CREATE MODAL PROPS: ", this.props);
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.state;
    return (
      <Modal
        title="Суртачилгааны ангилал бүртгэх"
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        onOk={this.props.onCancel}
        width={'50%'}
        afterClose={this.props.afterClose}
        destroyOnClose
        footer={[
          <Button type="primary" loading={loading} htmlType="submit" onClick={this.handleSubmit} >Хадгалах</Button>,
        ]}
      >
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
      </Modal>
    );
  }
}

const PromotionForm = Form.create({ name: 'create_promotion' })(Component);
export default PromotionForm;
