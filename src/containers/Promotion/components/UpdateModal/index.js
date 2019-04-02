import React from "react";
import { Modal, Form, Input, Checkbox, Button } from "antd";

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
        console.log('Received values of form: ', { ...values, skucds: this.props.data.skucds });
        this.props.update({ body: { ...values, skucds: this.props.data.skucds }, id: this.props.data.id })
          .then((res) => {
            this.setState({ loading: false });
            this.props.onCancel();
            this.props.refresh();
          });
      }
    });
  }

  render() {
    // console.log("PROMOTION UPDATE MODAL PROPS: ", this.props);
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.state;
    const { data } = this.props;

    return (
      <Modal
        title="Суртачилгааны ангилал засах"
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
              initialValue: `${data.promotnm}`,
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
                <Checkbox defaultChecked={data.isenable} />,
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const PromotionForm = Form.create({ name: 'create_promotion' })(Component);
export default PromotionForm;
