import React from "react";
import { Steps } from "antd";

import styles from "../../styles.less";
import { StepOne, StepTwo } from "../";

// eslint-disable-next-line prefer-destructuring
const Step = Steps.Step;

class Component extends React.Component {
  state = {
    step: 0,
    stepOneData: [],
  }

  handleNextStep = (e) => {
    if (this.state.step !== e.value) {
      if (this.state.step === 0) { this.stepOne.handleSubmit(); } else { this.setState({ step: e.value }); }
    }
  }

  getValue = (e) => { this.setState({ stepOneData: { ...e, skucds: [], id: 0 }, step: this.state.step + 1 }); }

  render() {
    // console.log('Main step', this.props);
    // console.log(this.state);
    const { step, stepOneData } = this.state;
    return (
      <div>
        <Steps current={step}>
          <Step title="Суртачилгааны ангилал бүртгэх" onClick={e => this.handleNextStep({ event: e, value: 0 })} />
          <Step title="Бараа тохируулах" onClick={e => this.handleNextStep({ event: e, value: 1 })} />
        </Steps>
        <div className={styles.stepContent}>
          {
            step === 0 ? <StepOne
              onRef={ref => (this.stepOne = ref)}
              onCancel={this.props.onCancel}
              nextStep={this.handleNextStep}
              getValue={this.getValue}
              defValue={stepOneData}
            />
              :
            <StepTwo
              data={stepOneData}
              product={this.props.product}
              getProduct={this.props.getProduct}
              create={this.props.create}
              onCancel={this.props.onCancel}
              refresh={this.props.refresh}
            />
          }
        </div>
      </div>
    );
  }
}

export default Component;
