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
    id: '',
    loading: true,
  };

  componentWillMount() {
    // console.log(this.props);
    this.props.getDetail({ id: this.props.id })
      .then((res) => {
        this.setState({
          stepOneData: this.props.detail.data,
          loading: false,
          id: this.props.id,
        });
      });
  }

  handleClickstep = (e) => {
    if (this.state.step !== e.value) {
      if (this.state.step === 0) { this.StepOne.handleSubmit('', true); } else { this.setState({ step: e.value }); }
    }
  };

  nextStep = (e) => {
    this.setState({ step: this.state.step + 1, stepOneData: e });
  }
  prevStep = () => { this.setState({ step: this.state.step - 1 }); }

  render() {
    const { step, stepOneData, loading } = this.state;

    if (!loading) {
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
          </Steps>

          <div className={styles.stepContent}>
            {step === 0 ? (
              <StepOne
                onRef={ref => (this.StepOne = ref)}
                dataSource={this.props.dataSource}
                filter={this.props.filter}
                auth={this.props.auth}
                nextStep={this.nextStep}
                defValue={stepOneData}
              />
                ) : (
                  <StepTwo
                    stepOneData={stepOneData}
                    onCancel={this.props.onCancel}
                    getProduct={this.props.getProduct}
                    product={this.props.product}
                    prevStep={this.prevStep}
                    create={this.props.updatePackage}
                    refresh={this.props.refresh}
                    id={this.state.id}
                  />
                )}
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
