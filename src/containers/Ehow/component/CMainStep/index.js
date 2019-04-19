import React from "react";
import { Steps } from "antd";

import { CStepOne, CStepTwo, CThree } from "../";

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
    // this.setState({ step: e.value });
  };

  nextStep = (e) => {
    this.setState({ step: this.state.step + 1 });
  };

  prevStep = (e) => {
    this.setState({ step: this.state.step - 1 });
  };

  render() {
    const { step } = this.state;

    return (
      <div>
        <Steps current={step}>
          <Step
            title="Жор үүсгэх"
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
            <CStepOne
              nextStep={this.nextStep}
              selectOption={this.props.selectOption}
              createStepOne={this.props.createStepOne}
              crecipe={this.props.crecipe.data}
              getStepOne={this.props.getStepOne}
              stepOneDetail={this.props.stepOneDetail}
            />
          ) : step === 1 ? (
            <CStepTwo
              crecipe={this.props.crecipe.data}
              getStepTwo={this.props.getStepTwo}
              stepTwoData={this.props.stepTwoData}
              createStepTwo={this.props.createStepTwo}
              nextStep={this.nextStep}
              prevStep={this.prevStep}
            />
          ) : (
            <CThree
              id={this.props.crecipe.data}
              getProduct={this.props.getProduct}
              product={this.props.product}
              updateProduct={this.props.updateProduct}
              prevStep={this.prevStep}
              onCancel={this.props.onCancel}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Component;
