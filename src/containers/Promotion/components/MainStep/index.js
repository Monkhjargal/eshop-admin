import React from "react";
import { Steps } from "antd";

import styles from "../../styles.less";
import { StepOne, StepTwo } from "../";

// eslint-disable-next-line prefer-destructuring
const Step = Steps.Step;

class Component extends React.Component {
  state = {
    step: 0,
  }

  handleNextStep = (e) => {
    if (this.state.step !== e.value) {
      this.child.getAlert();
    }
  }


  render() {
    // console.log('Main step', this.props);
    const { step } = this.state;
    return (
      <div>
        <Steps current={step}>
          <Step title="Суртачилгааны ангилал бүртгэх" onClick={e => this.handleNextStep({ event: e, value: 0 })} />
          <Step title="Бараа тохируулах" onClick={e => this.handleNextStep({ event: e, value: 1 })} />
        </Steps>
        <div className={styles.stepContent}>
          {
            step === 0 ? <StepOne
              ref={(instance) => { this.child = instance; }}
              onCancel={this.props.onCancel}
              nextStep={this.handleNextStep}
            />
              :
            <StepTwo
              data={this.props.data}
              product={this.props.product}
              getProduct={this.props.getProduct}
            />
          }
        </div>
      </div>
    );
  }
}

export default Component;
