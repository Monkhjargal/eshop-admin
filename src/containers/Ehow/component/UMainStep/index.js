import React from "react";
import { Steps } from "antd";

import { UStepOne, CStepTwo, CThree } from "../";

// eslint-disable-next-line prefer-destructuring
const Step = Steps.Step;

class Component extends React.Component {
  state = {
    step: 0,
    stepOneData: [],
  };

  handleClickstep = (e) => {
    // if (this.state.step !== e.value) {
    //   if (this.state.step === 0) {
    //     this.StepOne.handleSubmit(null, true);
    //   } else { this.setState({ step: e.value }); }
    // }
    this.setState({ step: e.value });
  };

  nextStep = (e) => {
    this.setState({ step: this.state.step + 1 });
  };
  //   prevStep = () => { this.setState({ step: this.state.step - 1 }); }

  render() {
    const { step, stepOneData } = this.state;

    return (
      <div>
        <Steps current={step}>
          <Step
            title="Жорын мэдээлэл"
            onClick={e => this.handleClickstep({ event: e, value: 0 })}
          />
          <Step
            title="Алхамууд тохируулах"
            onClick={e => this.handleClickstep({ event: e, value: 1 })}
          />
          <Step
            title="Бараа тохируулах"
            onClick={e => this.handleClickstep({ event: e, value: 2 })}
          />
        </Steps>

        <div className="top-container">
          {step === 0 ? (
            <UStepOne
              nextStep={this.nextStep}
              selectOption={this.props.selectOption}
              updateStepOne={this.props.updateStepOne}
              crecipe={this.props.crecipe}
              getStepOne={this.props.getStepOne}
              stepOneDetail={this.props.stepOneDetail}
              selectedRow={this.props.selectedRow}
            />
          ) : step === 1 ? (
            <CStepTwo
              crecipe={this.props.selectedRow.id}
              getStepTwo={this.props.getStepTwo}
              stepTwoData={this.props.stepTwoData}
              createStepTwo={this.props.createStepTwo}
            />
          ) : (
            <CThree
              id={this.props.selectedRow.id}
              getProduct={this.props.getProduct}
              product={this.props.product}
              updateProduct={this.props.updateProduct}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Component;
