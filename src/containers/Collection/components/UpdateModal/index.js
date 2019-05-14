import React from "react";
import { Modal } from "antd";
import { UMainStep } from "../";

class Component extends React.Component {
  render() {
    return (
      <Modal
        title="Багцын дэлгэрэнгүй засах"
        visible={this.props.visible}
        footer={null}
        onCancel={this.props.onCancel}
        onOk={this.props.onCancel}
        width={'65%'}
        style={{ top: 20 }}
        destroyOnClose
      >
        <UMainStep
          onCancel={this.props.onCancel}
          getProduct={this.props.getProduct}
          product={this.props.product}
          id={this.props.id}
          getDetail={this.props.getDetail}
          detail={this.props.detail}
          updatePackage={this.props.updatePackage}
          refresh={this.props.refresh}
        />
      </Modal>
    );
  }
}

export default Component;
