import React from "react";
import { Steps } from "antd";
import { StatusStepOne, StatusStepTwo } from "../";
import styles from "../../styles.less";

// eslint-disable-next-line prefer-destructuring
const Step = Steps.Step;

class MainStep extends React.Component {
  state = {
    step: 0,
    stepOneFrom: {},
  }

  handleClickStep = (e) => { } // if (this.state.step !== e.value) { this.setState({ step: e.value }); }
  handleNextStep = (values) => { this.setState({ step: this.state.step + 1, stepOneFrom: values }); }

  render() {
    const { step } = this.state;
    return (
      <div>
        <Steps current={step}>
          <Step title="Төлөв өөрчлөх хүсэлт" onClick={e => this.handleClickStep({ event: e, value: 0 })} />
          <Step title="Бараа тохируулах" onClick={e => this.handleClickStep({ event: e, value: 1 })} />
        </Steps>
        <div className={styles.stepContent}>
          {
              step === 0 ? <StatusStepOne
                onCancel={this.props.onCancel}
                nextStep={this.handleNextStep}
              />
              :
              <StatusStepTwo
                stepOneFrom={this.state.stepOneFrom}
                onCancel={this.props.onCancel}
                product={this.props.product}
                getStatusProduct={this.props.getStatusProduct}
                nextStep={this.handleNextStep}
                changeProductStatus={this.props.changeProductStatus}
              />
            }
        </div>
      </div>
    );
  }
}

export default MainStep;
