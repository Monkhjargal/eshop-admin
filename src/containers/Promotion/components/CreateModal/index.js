import React from "react";
import { Modal, Form, Input, Checkbox, Button } from "antd";
import styles from "../../styles.less";
import { MainStep } from "../";

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
        footer={null}
        // footer={[
        //   <Button type="primary" loading={loading} htmlType="submit" onClick={this.handleSubmit} >Хадгалах</Button>,
        // ]}
      >
        <MainStep
          getProduct={this.props.getProduct}
          product={this.props.product}
          updateProduct={this.props.updateProduct}
          create={this.props.create}
          data={this.props.data}
          onCancel={this.props.onCancel}
        />
      </Modal>
    );
  }
}

const PromotionForm = Form.create({ name: 'create_promotion' })(Component);
export default PromotionForm;
