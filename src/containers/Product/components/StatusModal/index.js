import React from "react";
import { Modal } from "antd";
import { StatusSteps } from "../";

class Component extends React.Component {
  render() {
    return (
      <Modal
        title="Барааны төлөв өөрчлөх"
        visible={this.props.visible}
        footer={null}
        onCancel={this.props.onCancel}
        width={'60%'}
        destroyOnClose
      >
        <StatusSteps
          product={this.props.product}
          getStatusProduct={this.props.getStatusProduct}
          onCancel={this.props.onCancel}
          changeProductStatus={this.props.changeProductStatus}
        />
      </Modal>
    );
  }
}

export default Component;
