import React from "react";
import { Steps, Icon } from "antd";

import styles from "../../styles.less";
import { StepOne, StepTwo, StepThree } from "../";

// eslint-disable-next-line prefer-destructuring
const Step = Steps.Step;

class Component extends React.Component {
  state = {
    step: 0,
  }

  handleClickstep = (e) => { if (this.state.step !== e.value) { this.setState({ step: e.value }); } }

  handleNextStep = () => { this.setState({ step: this.state.step + 1 }); }
  handlePrevStep = () => { this.setState({ step: this.state.step - 1 }); }

  render() {
    // console.log('Main step', this.props);
    const { step } = this.state;
    return (
      <div>
        <Steps current={step}>
          <Step title="Барааны дэлгэрэнгүй бүртгэл" onClick={e => this.handleClickstep({ event: e, value: 0 })} />
          <Step title="Барааны аттрибут бүртгэл" onClick={e => this.handleClickstep({ event: e, value: 1 })} />
          <Step title="Хослох бараа бүртгэл" onClick={e => this.handleClickstep({ event: e, value: 2 })} />
        </Steps>
        <div className={styles.stepContent}>
          <Icon
            type="eye"
            style={{ position: 'fixed', marginLeft: '75%', zIndex: 1000 }}
            onClick={() => window.open(`http://test.e-mart.mn/productdetail/${this.props.dataSource.skucd}`, "_blank")}
          />
          {
            step === 0 ? <StepOne
              skucd={this.props.dataSource.skucd}
              filter={this.props.filter}
              updateProduct={this.props.updateProduct}
              detail={this.props.detail}
              getDetail={this.props.getDetail}
              nextStep={this.handleNextStep}
              getStatusHistory={this.props.getStatusHistory}
              statusHistory={this.props.statusHistory}
            />
              :
              step === 1 ? <StepTwo
                getAttribute={this.props.getAttribute}
                skucd={this.props.dataSource.skucd}
                attribute={this.props.attribute}
                updateAttr={this.props.updateAttr}
                nextStep={this.handleNextStep}
                prevStep={this.handlePrevStep}
              />
                :
              <StepThree
                product={this.props.product}
                relational={this.props.relational}
                skucd={this.props.dataSource.skucd}
                getRelational={this.props.getRelational}
                updateRelational={this.props.updateRelational}
                prevStep={this.handlePrevStep}
                onCancel={this.props.onCancel}
              />
          }
        </div>
      </div>
    );
  }
}

export default Component;
