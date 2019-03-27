import React from "react";
import { Steps } from "antd";

import styles from "../../styles.less";
import { StepOne, StepTwo } from "../";

// eslint-disable-next-line prefer-destructuring
const Step = Steps.Step;

class Component extends React.Component {
  state = {
    step: 0,
  };
  handleClickstep = (e) => {
    if (this.state.step !== e.value) {
      this.setState({ step: e.value });
    }
  };

  render() {
    const { step } = this.state;
    return (
      <div>
        <Steps current={step}>
          <Step
            title="Багц үүсгэх"
            onClick={e => this.handleClickstep({ event: e, value: 0 })}
          />
          <Step
            title="Бараа тохируулах"
            onClick={e => this.handleClickstep({ event: e, value: 1 })}
          />
          {/* <Step title="Хослох бараа бүртгэл" onClick={e => this.handleClickstep({ event: e, value: 2 })} /> */}
        </Steps>
        <div className={styles.stepContent}>
          {step === 0 ? (
            <StepOne
              dataSource={this.props.dataSource}
              filter={this.props.filter}
              auth={this.props.auth}
            />
          ) : step === 1 ? (
            <StepTwo
              dataSource={this.props.dataSource}
              filter={this.props.filter}
            />
          ) : (
            <h1>2</h1>
          )}
        </div>
      </div>
    );
  }
}

export default Component;
