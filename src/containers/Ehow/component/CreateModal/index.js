import React from "react";
import { Modal } from "antd";
import { CMainStep } from "../";

class Component extends React.Component {
  render() {
    return (
      <Modal
        title="Жор нэмэх"
        visible={this.props.visible}
        footer={null}
        onCancel={this.props.onCancel}
        onOk={this.props.onCancel}
        width={'70%'}
        destroyOnClose
        afterClose={this.props.refresh}
      >
        <CMainStep
          id={0}
          onCancel={this.props.onCancel}
          getProduct={this.props.getProduct}
          product={this.props.product}
          create={this.props.create}
          refresh={this.props.refresh}
          selectOption={this.props.selectOption}
          createStepOne={this.props.createStepOne}
          crecipe={this.props.crecipe}
          getStepTwo={this.props.getStepTwo}
          stepTwoData={this.props.stepTwoData}
          createStepTwo={this.props.createStepTwo}
          updateProduct={this.props.updateProduct}
        />
      </Modal>
    );
  }
}

export default Component;
