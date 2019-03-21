import React from "react";
import { Modal, Steps, Col, Select, Form, Input, Button } from "antd";

import styles from "../../styles.less";

// eslint-disable-next-line prefer-destructuring
const Step = Steps.Step;

const stepNeg = (props) => {
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 17 },
  };

  const formTailLayout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
  };

  const { getFieldDecorator } = props.form;
  //   console.log(props);
  return (
    <Col span={24}>
      <Form.Item {...formItemLayout} className={styles.formItem} label="Зассан хэрэглэгч">
        {getFieldDecorator('username', {
          rules: [{
            required: true,
            message: 'Өөрчлөх төлөвөө заавал оруулна уу!',
          }],
    })(
      <Select
        style={{ width: '100%' }}
        placeholder="Өөрчлөх төлөв"
      >
        <Select.Option value="jack">{'Худалдана -> Түр худалдахгүй'}</Select.Option>
        <Select.Option value="lucy">{'Түр худалдахгүй -> Худалдана'}</Select.Option>
      </Select>,
    )}
      </Form.Item>
      <Form.Item {...formItemLayout} className={styles.formItem} label="Тайлбар">
        {getFieldDecorator('username', {
          rules: [{
            required: true,
            message: 'Тайлбараа заавал оруулна уу!',
          }],
        })(
          <Input.TextArea rows={4} />,
        )}
      </Form.Item>

      <Form.Item {...formTailLayout} style={{ margin: '4%' }}>
        <Button type="primary" onClick={this.check} style={{ float: 'right' }}>{`Дараагийнхруу шилжих`}</Button>{` `}
        <Button onClick={this.check} style={{ float: 'right', marginLeft: 5 }}>{`болих`}</Button>
      </Form.Item>
    </Col>
  );
};
const StepOne = Form.create({ name: 'stepone' })(stepNeg);


class Component extends React.Component {
    state = {
      step: 0,
    }

    handleClickstep = (e) => {
      if (this.state.step !== e.value) { this.setState({ step: e.value }); }
    }

    render() {
      const { step } = this.state;
      return (
        <Modal
          title="Барааны төлөв өөрчлөх"
          visible={this.props.visible}
          footer={null}
          onCancel={this.props.onCancel}
          onOk={this.props.onCancel}
          width={'60%'}
        >
          <Steps current={step}>
            <Step title="Төлөв өөрчлөх хүсэлт" onClick={e => this.handleClickstep({ event: e, value: 0 })} />
            <Step title="Бараа тохируулах" onClick={e => this.handleClickstep({ event: e, value: 1 })} />
          </Steps>
          <div className={styles.stepContent}>
            {
                step === 0 ? <StepOne helo={'sds'} /> : ''
            }
          </div>
        </Modal>
      );
    }
}

export default Component;
