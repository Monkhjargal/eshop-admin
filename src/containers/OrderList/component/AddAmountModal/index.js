import React from "react";
import { Modal, Form, Input, Select, InputNumber, Button, Icon, Row } from "antd";

const { TextArea } = Input;

class Component extends React.Component {
  state = { loading: false }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        this.props.addAmount({ body: values, id: this.props.id }).then((res) => {
          console.log('this.props.id: ', this.props.id);

          this.setState({ loading: false });
          this.props.onCancel();
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { select } = this.props;
    const { loading } = this.state;

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };

    try {
      return (
        <Modal
          title="Төлбөр төлөлтийг дүнг өөрчлөх"
          visible={this.props.visible}
          footer={null}
          onCancel={this.props.onCancel}
          onOk={this.props.onCancel}
          width={"40%"}
          destroyOnClose
        >
          <Row>
            <Form onSubmit={this.handleSubmit}>
              <Form.Item {...formItemLayout} label="Дүн">
                {getFieldDecorator("amount", {
                  rules: [
                    {
                      required: true,
                      message: "Заавал бөглөнө үү!",
                    },
                  ],
                })(<InputNumber
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  style={{ width: '100%' }}
                />)}
              </Form.Item>
              <Form.Item {...formItemLayout} label="Банк">
                {getFieldDecorator("bankid", {
                  rules: [
                    {
                      required: true,
                      message: "Заавал бөглөнө үү!",
                    },
                  ],
                })(
                  <Select>
                    {select.bankinfo.map(i => <Select.Option key={i.id} value={i.id}>{i.name}</Select.Option>)}
                  </Select>,
                )}
              </Form.Item>
              <Form.Item {...formItemLayout} label="Тайлбар">
                {getFieldDecorator("description", {
                  rules: [
                    {
                      required: true,
                      message: "Заавал бөглөнө үү!",
                    },
                  ],
                })(<TextArea autosize={{ minRows: 3 }} />)}
              </Form.Item>
              <Form.Item style={{ float: "right", marginTop: 10 }} >
                <Button type="primary" htmlType="submit" loading={loading} ><Icon type="save" />Хадгалах</Button>
              </Form.Item>
            </Form>
          </Row>
        </Modal>
      );
    } catch (error) {
      return console.log(error);
    }
  }
}

export default Form.create({ name: "add_amount" })(Component);
