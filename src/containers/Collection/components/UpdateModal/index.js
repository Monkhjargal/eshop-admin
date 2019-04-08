import React from "react";
import { Modal } from "antd";
import { MainStep } from "../";

class Component extends React.Component {
  render() {
    return (
      <Modal
        title="Багцын дэлгэрэнгүй засах"
        visible={this.props.visible}
        footer={null}
        onCancel={this.props.onCancel}
        onOk={this.props.onCancel}
        width={'60%'}
        destroyOnClose
      >
        <MainStep
          onCancel={this.props.onCancel}
          getProduct={this.props.getProduct}
          product={this.props.product}
        />
      </Modal>
    );
  }
}

export default Component;
