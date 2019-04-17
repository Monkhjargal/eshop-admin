import React from "react";
import { Modal } from "antd";
import { UMainStep } from "../";

class Component extends React.Component {
  render() {
    // console.log(this.props.stepOneDetail);
    return (
      <Modal
        title="Жор засах"
        visible={this.props.visible}
        footer={null}
        onCancel={this.props.onCancel}
        onOk={this.props.onCancel}
        width={'70%'}
        destroyOnClose
        afterClose={this.props.refresh}
      >
        <UMainStep
          id={0}
          onCancel={this.props.onCancel}
          getProduct={this.props.getProduct}
          product={this.props.product}
          create={this.props.create}
          refresh={this.props.refresh}
          selectOption={this.props.selectOption}
          crecipe={this.props.crecipe}
          getStepTwo={this.props.getStepTwo}
          stepTwoData={this.props.stepTwoData}
          createStepTwo={this.props.createStepTwo}
          getStepOne={this.props.getStepOne}
          stepOneDetail={this.props.stepOneDetail}
          selectedRow={this.props.selectedRow}
          updateStepOne={this.props.updateStepOne}
          updateProduct={this.props.updateProduct}
        />
      </Modal>
    );
  }
}

export default Component;
