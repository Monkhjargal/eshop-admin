import React from "react";
import { Steps, Spin } from "antd";

import styles from "../../styles.less";
import { StepOne, StepTwo } from "../";

// eslint-disable-next-line prefer-destructuring
const Step = Steps.Step;

class Component extends React.Component {
  state = {
    step: 0,
    stepOneData: [],
    id: 0,
    loading: true,
  }

  componentWillMount() {
    this.props.getDetail({ id: this.props.id })
      .then((res) => {
        this.setState({ stepOneData: this.props.detail.data.value, loading: false, id: this.props.detail.data.value.id });
      });
  }

  handleNextStep = (e) => {
    if (this.state.step !== e.value) {
      if (this.state.step === 0) { this.stepOne.handleSubmit(); } else { this.setState({ step: e.value }); }
    }
  }

  getValue = (e) => { this.setState({ stepOneData: { ...e, skucds: [], id: this.state.id }, step: this.state.step + 1 }); }

  render() {
    // console.log('Update Main step', this.props);
    // console.log(this.state);
    const { step, stepOneData, loading } = this.state;

    if (!loading) {
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
                create={this.props.update}
                onCancel={this.props.onCancel}
                refresh={this.props.refresh}
              />
            }
          </div>
        </div>
      );
    }

    return (
      <div style={{ marginLeft: '49%', paddingTop: '15%', paddingBottom: '15%' }}><Spin /></div>
    );
  }
}

export default Component;
