import React from "react";
import { Modal, Form, Input, Button, Icon, Upload, Row } from "antd";

import styles from "../../../../components/List/style.less";

const { TextArea } = Input;
const picserver = 'http://202.55.180.199:8877/';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 15 },
};

class Step extends React.Component {
  render() {
    return <Update {...this.props} />;
  }
}
export default Step;


// eslint-disable-next-line react/no-multi-comp
class Component extends React.Component {
  state = {
    previewImage: '',
    previewVisible: false,
    file: [],
  }

  componentWillMount() {
    const { file } = this.state;
    const { data } = this.props;
    console.log('this.props: ', this.props);

    if (Array.isArray(data.file)) {
      file.push(data.file[0]);
    } else {
      file.push({ uid: 1, name: data.file, url: picserver + data.file });
    }

    this.setState({ file });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.file = this.state.file;
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
    const { visible, onCancel, data } = this.props;
    const { previewVisible, previewImage, file } = this.state;
    const { getFieldDecorator } = this.props.form;

    try {
      return (
        <Modal
          destroyOnClose
          title="Алхам засах"
          visible={visible}
          footer={null}
          width={'60%'}
          onCancel={onCancel}
          afterClose={this.handleResetForm}
        >
          <Row>
            <Form onSubmit={this.handleSubmit}>
              <Form.Item {...formItemLayout} label="Алхмын дугаар" className={styles.formItem}>
                {getFieldDecorator('orders', { initialValue: data.orders, rules: [{ required: true, message: 'Заавал бөглөнө үү!' }] })(
                  <Input
                    placeholder="Алхмын дугаар"
                  />,
                    )}
              </Form.Item>
              <Form.Item {...formItemLayout} label="Алхмын тайлбар" className={styles.formItem}>
                {getFieldDecorator('description', { initialValue: data.description, rules: [{ required: true, message: 'Заавал бөглөнө үү!' }] })(
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
                    initialValue: file,
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
    } catch (error) {
      return console.log('error: ', error);
    }
  }
}

const Update = Form.create({ name: 'recipe' })(Component);
