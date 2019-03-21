import React from "react";
import { Steps } from "antd";

import styles from "../../styles.less";
import { StepOne, StepTwo, StepThree } from "../";

// eslint-disable-next-line prefer-destructuring
const Step = Steps.Step;

class Component extends React.Component {
  state = {
    step: 0,
  }
  handleClickstep = (e) => {
    if (this.state.step !== e.value) { this.setState({ step: e.value }); }
  }

  render() {
    const { step } = this.state;
    // console.log('Main step', this.props);
    return (
      <div>
        <Steps current={step}>
          <Step title="Барааны дэлгэрэнгүй бүртгэл" onClick={e => this.handleClickstep({ event: e, value: 0 })} />
          <Step title="Барааны аттрибут бүртгэл" onClick={e => this.handleClickstep({ event: e, value: 1 })} />
          <Step title="Хослох бараа бүртгэл" onClick={e => this.handleClickstep({ event: e, value: 2 })} />
        </Steps>
        <div className={styles.stepContent}>
          {
            step === 0 ? <StepOne
              dataSource={this.props.dataSource}
              filter={this.props.filter}
              updateProduct={this.props.updateProduct}
              detail={this.props.detail}
            />
              :
              step === 1 ? <StepTwo
                getAttribute={this.props.getAttribute}
                skucd={this.props.dataSource.skucd}
                attribute={this.props.attribute}
                updateAttr={this.props.updateAttr}
              />
                :
              <StepThree
                product={this.props.product}
              />
          }
        </div>
      </div>
    );
  }
}

export default Component;
