import React from "react";
import { Modal } from "antd";
import { ProductTransfer } from "../";

class Component extends React.Component {
  render() {
    // console.log("PROMOTION TRANSFER MODAL PROPS: ", this.props);
    return (
      <Modal
        title="Суртачилгааны ангилалын бараа бүртгэл"
        visible={this.props.visible}
        footer={null}
        onCancel={this.props.onCancel}
        onOk={this.props.onCancel}
        width={'50%'}
        heigth={600}
        afterClose={this.props.afterClose}
        destroyOnClose
      >
        <ProductTransfer
          data={this.props.data}
          getProduct={this.props.getProduct}
          product={this.props.product}
          updateProduct={this.props.updateProduct}
          onCancel={this.props.onCancel}
        />
      </Modal>
    );
  }
}

export default Component;
