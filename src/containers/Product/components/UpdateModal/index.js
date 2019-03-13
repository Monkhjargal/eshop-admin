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
        width={'60%'}
      >
        <MainStep dataSource={this.props.dataSource} filter={this.props.filter} />
      </Modal>
    );
  }
}

export default Component;
