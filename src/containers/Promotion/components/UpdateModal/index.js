import React from "react";
import { Modal, Form } from "antd";
import { UMainStep } from "../";

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
      >
        <UMainStep
          getProduct={this.props.getProduct}
          product={this.props.product}
          update={this.props.update}
          data={this.props.data}
          id={this.props.id}
          detail={this.props.detail}
          onCancel={this.props.onCancel}
          refresh={this.props.refresh}
          getDetail={this.props.getDetail}
        />
      </Modal>
    );
  }
}

const PromotionForm = Form.create({ name: 'create_promotion' })(Component);
export default PromotionForm;
