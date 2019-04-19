import React from "react";
import { Form, Row, Col, Input, Button, Icon, Checkbox, Select, Upload, Modal, InputNumber } from "antd";
import CKEditor from "react-ckeditor-component";

import styles from "../../styles.less";

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 15 },
};

const ckeToolbar = [
  { name: 'document', items: ['Source', 'Save', 'NewPage', 'Preview', 'Print', '-', 'Templates'] },
  { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
  { name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt'] },
  { name: 'forms', items: ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField'] },
  '/',
  { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat'] },
  { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language'] },
  { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
  { name: 'insert', items: ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe'] },
  '/',
  { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
  { name: 'colors', items: ['TextColor', 'BGColor'] },
  { name: 'tools', items: ['Maximize', 'ShowBlocks'] },
  { name: 'about', items: ['About'] },
];

class Step extends React.Component {
  state = {
    fileList: [],
    description: '',
    previewVisible: false,
    sloading: false,
  }

  handleSubmit = (e, isprev) => {
    if (!isprev) { e.preventDefault(); }
    this.props.form.validateFields((err, values) => {
      const { fileList, description } = this.state;
      if (
        values.featuretxt !== '' && values.humancnt !== '' && values.ingredients.length !== 0 && fileList.length !== 0 &&
        values.madeoflvl.length !== 0 && values.recipenm !== '' && values.spice.length !== 0 && values.time !== "" && description.length !== 0) {
        this.setState({ sloading: true });

        let formData = new FormData();

        Object.keys(values).map(keyname => formData.append(keyname, values[keyname]));
        fileList.map(i => formData.append("files", i.originFileObj, i.name));
        formData.append("description", description);
        formData.append("imgnm", '');

        const isfiles = true;
        this.props.createStepOne({ body: formData, isfiles })
          .then((res) => {
            this.setState({ sloading: false });
          });
        this.handleNextStep();
      } else {
        console.log('err');
      }
    });
  }

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChangeImg = ({ fileList }) => this.setState({ fileList });
  handleCancel = () => this.setState({ previewVisible: false })

  formItemValidate = (item) => {
    try {
      const { form } = this.props;
      if (form.getFieldValue(item) === undefined || form.getFieldValue(item) === '' || form.getFieldValue(item).length === 0) { return "error"; }
      return "success";
    } catch (error) {
      return "error";
    }
  }

  handleChangeCkE = (evt) => {
    this.setState({ description: evt.editor.getData() });
  }

  handleNextStep = () => {
    const { description, fileList } = this.state;
    this.props.form.validateFields((err, values) => {
      if (values.featuretxt !== '' && values.humancnt !== '' && values.ingredients.length !== 0 && fileList.length !== 0 &&
      values.madeoflvl.length !== 0 && values.recipenm !== '' && values.spice.length !== 0 && values.time !== "" && description.length !== 0) {
        this.props.nextStep();
      }
    });
  }

  render() {
    // console.log(this.props.form);
    const { getFieldDecorator } = this.props.form;
    const {
      fileList, previewVisible, previewImage, sloading, description,
    } = this.state;

    return (
      <div style={{ marginTop: 20 }}>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col span={12}>
              <Form.Item {...formItemLayout} label="Жорын нэр" className={styles.formItem} hasFeedback validateStatus={this.formItemValidate('recipenm')}>
                {getFieldDecorator('recipenm', { initialValue: '', rules: [{ required: true, message: 'Заавал бөглөнө үү!' }] })(
                  <Input
                    placeholder="Хоолны жорын нэр"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item {...formItemLayout} label="Богино тайлбар" className={styles.formItem} hasFeedback validateStatus={this.formItemValidate('featuretxt')}>
                {getFieldDecorator('featuretxt', { initialValue: ``, rules: [{ required: true, message: 'Заавал бөглөнө үү!' }] })(
                  <Input
                    placeholder="Богино тайлбар"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item {...formItemLayout} label="Түвшин" className={styles.formItem} hasFeedback validateStatus={this.formItemValidate('madeoflvl')}>
                {getFieldDecorator('madeoflvl', { initialValue: [], rules: [{ required: true, message: 'Заавал бөглөнө үү!' }] })(
                  <Select
                    allowClear
                    placeholder="Түвшин"
                  >
                    {this.props.selectOption.data.madeoflvl.map((i, key) => <Select.Option key={i.id}>{i.name}</Select.Option>)}
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item {...formItemLayout} label="Хугацаа" className={styles.formItem} hasFeedback validateStatus={this.formItemValidate('time')}>
                {getFieldDecorator('time', { initialValue: ``, rules: [{ required: true, message: 'Заавал бөглөнө үү!' }] })(
                  <Input
                    placeholder="Хугацаа"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item {...formItemLayout} label="Порц /Хүн/ " className={styles.formItem} hasFeedback validateStatus={this.formItemValidate('humancnt')}>
                {getFieldDecorator('humancnt', { initialValue: ``, rules: [{ required: true, message: 'Заавал бөглөнө үү!' }] })(
                  <Input
                    style={{ width: '100%' }}
                    placeholder="Порц /Хүн/"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item {...formItemLayout} label="Идэвхтэй эсэх" className={styles.formItem}>
                {getFieldDecorator('isenable', { initialValue: false, rules: [{ required: false }] })(
                  <Checkbox />,
                )}
              </Form.Item>
            </Col>
            <Col span={12} >
              <Form.Item label="Жорын орц" {...formItemLayout} className={styles.formItem} hasFeedback validateStatus={this.formItemValidate('ingredients')}>
                {getFieldDecorator('ingredient', { initialValue: [], rules: [{ required: true, message: 'Заавал бөглөнө үү!' }] })(
                  <Select
                    allowClear
                    mode="tags"
                    placeholder="Жорын орц"
                  >
                    {this.props.selectOption.data.ingredient.map(i => <Select.Option key={i.id}>{i.name}</Select.Option>)}
                  </Select>,
                  )}
              </Form.Item>
            </Col>
            <Col span={12} >
              <Form.Item label="Амтлагч" {...formItemLayout} className={styles.formItem} hasFeedback validateStatus={this.formItemValidate('spice')}>
                {getFieldDecorator('spice', { initialValue: [], rules: [{ required: true, message: 'Заавал бөглөнө үү!' }] })(
                  <Select
                    allowClear
                    mode="tags"
                    placeholder="Амтлагч"
                  >
                    {this.props.selectOption.data.spice.map(i => <Select.Option key={i.id}>{i.name}</Select.Option>)}
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <div style={{ marginLeft: 20 }}>
                {/* <Form.Item label="Зургийн тохиргоо" /> */}
                <Form.Item label="Зургийн тохиргоо" hasFeedback className={styles.formItem} validateStatus={fileList.length === 0 ? "error" : "success"} />
                <Upload
                  accept={".jpg,.png,.jpeg,.gif"}
                  action="//jsonplaceholder.typicode.com/posts/"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  onRemove={this.handleRemove}
                  onChange={this.handleChangeImg}
                >
                  {fileList.length >= 5 ? null : <div><Icon type="plus" /><div className="ant-upload-text">Upload</div></div>}
                </Upload>
              </div>
              <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </Col>

            <Col span={24} style={{ marginLeft: 20 }}>
              <Form.Item label="Дэлгэрэнгүй тайлбар" hasFeedback validateStatus={description.length === 0 ? "error" : "success"} />
              <CKEditor
                activeClass="p10"
                content={description}
                scriptUrl={'https://cdn.ckeditor.com/4.6.2/full/ckeditor.js'}
                config={{ ckeToolbar }}
                events={{
                    change: this.handleChangeCkE,
                  }}
              />
            </Col>

            <Col span={24}>
              <Form.Item className={styles.stepSaveBtn}>
                <Button type="primary" htmlType="submit" loading={sloading}><Icon type="save" />Хадгалах</Button>{" "}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default Form.create({ name: 'recipe' })(Step);
