import React from "react";
import { Modal } from "antd";
import { MainStep } from "../";

class Component extends React.Component {
  render() {
    return (
      <Modal
        title="Барааны дэлгэрэнгүй засах"
        visible={this.props.visible}
        footer={null}
        onCancel={this.props.onCancel}
        onOk={this.props.onCancel}
        width={'80%'}
        destroyOnClose
      >
        <MainStep
          dataSource={this.props.dataSource}
          filter={this.props.filter}
          updateProduct={this.props.updateProduct}
          detail={this.props.detail}
          getDetail={this.props.getDetail}
          getAttribute={this.props.getAttribute}
          attribute={this.props.attribute}
          updateAttr={this.props.updateAttr}
          product={this.props.product}
          relational={this.props.relational}
          getRelational={this.props.getRelational}
          updateRelational={this.props.updateRelational}
          getStatusHistory={this.props.getStatusHistory}
          statusHistory={this.props.statusHistory}
        />
      </Modal>
    );
  }
}

export default Component;
