import React from "react";
import { Modal, Form, Input, Button, Icon, Upload, Row } from "antd";

import styles from "../../../../components/List/style.less";

const { TextArea } = Input;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 15 },
};

class Component extends React.Component {
  state = {
    previewImage: '',
    previewVisible: false,
    file: [],
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.file = values.file.fileList;
        this.props.handleSubmit(values);
        this.props.onCancel();
      }
    });
  }

  handleCancel = () => this.setState({ previewVisible: false })
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChangeImg = ({ fileList }) => {
    this.setState({ file: fileList });
    this.props.form.setFieldsValue({ file: fileList });
  };

  handleResetForm = () => {
    this.setState({ file: [] });
    this.props.form.resetFields();
  }

  render() {
    const { visible, onCancel, step } = this.props;
    const { previewVisible, previewImage, file } = this.state;
    const { getFieldDecorator } = this.props.form;

    return (
      <Modal
        destroyOnClose
        title="Алхам нэмэх"
        visible={visible}
        footer={null}
        width={'60%'}
        onCancel={onCancel}
        afterClose={this.handleResetForm}
      >
        <Row>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item {...formItemLayout} label="Алхмын дугаар" className={styles.formItem}>
              {getFieldDecorator('seq', { initialValue: step, rules: [{ required: true, message: 'Заавал бөглөнө үү!' }] })(
                <Input
                  placeholder="Алхмын дугаар"
                />,
                  )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Алхмын тайлбар" className={styles.formItem}>
              {getFieldDecorator('description', { rules: [{ required: true, message: 'Заавал бөглөнө үү!' }] })(
                <TextArea
                  placeholder="Алхмын тайлбар"
                  autosize={{ minRows: 6, maxRows: 15 }}
                />,
                )}
            </Form.Item>
            <Form.Item
              className={styles.formItem}
              label="Алхмын зураг"
              {...formItemLayout}
            >
              {getFieldDecorator('file', {
                  initialValue: [],
                  rules: [{
                    required: true, message: 'Заавал бөглөнө үү!',
                  }],
                })(
                  <Upload
                    accept={".jpg,.png,.jpeg,.gif"}
                    action="//jsonplaceholder.typicode.com/posts/"
                    listType="picture-card"
                    fileList={file}
                    onPreview={this.handlePreview}
                    onChange={this.handleChangeImg}
                  >
                    {file.length >= 1 ? null : <div><Icon type="plus" /><div className="ant-upload-text">Upload</div></div>}
                  </Upload>,
                )}
              <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </Form.Item>
            <Form.Item style={{ float: "right" }}>
              <Button disabled={file.length === 0} type="primary" htmlType="submit" ><Icon type="save" />Хадгалах</Button>{" "}
            </Form.Item>
          </Form>
        </Row>
      </Modal>
    );
  }
}

export default Form.create({ name: 'recipe' })(Component);
