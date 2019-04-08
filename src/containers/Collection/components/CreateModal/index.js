import React from "react";
import { Modal } from "antd";
import { MainStep } from "../";

class Component extends React.Component {
  render() {
    return (
      <Modal
        title="Багц нэмэх"
        visible={this.props.visible}
        footer={null}
        onCancel={this.props.onCancel}
        onOk={this.props.onCancel}
        width={'60%'}
      >
        <MainStep
          onCancel={this.props.onCancel}
          getProduct={this.props.getProduct}
          product={this.props.product}
          create={this.props.create}
        />
      </Modal>
    );
  }
}

export default Component;
