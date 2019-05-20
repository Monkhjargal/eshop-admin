import React from "react";
import {
  Form,
  Input,
  Col,
  Row,
  Icon,
  Upload,
  Checkbox,
  Button,
  Modal,
} from "antd";
import CKEditor from "react-ckeditor-component";
import styles from "../../styles.less";

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 17 },
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

class Component extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
    description: '',
  }

  componentDidMount() { this.props.onRef(this); }
  componentWillUnmount() { this.props.onRef(null); }
  componentWillMount() {
    // console.log(this.props);
    let files = [];

    // eslint-disable-next-line no-unused-expressions
    this.props.defValue.files === undefined ? '' : this.props.defValue.files.map((i, index) => files.push({ url: process.env.PIC_SERVER + i, name: i, uid: index }));
    // eslint-disable-next-line no-unused-expressions
    this.props.defValue.length === 0 ? '' : this.setState({ fileList: this.props.defValue.fileList === undefined ? files : this.props.defValue.fileList, description: this.props.defValue.description });
  }

  handleChangeImg = ({ fileList }) => {
    this.props.form.setFields({
      imageList: {
        value: fileList,
        errors: [new Error('forbid ha')],
      },
    });
    this.setState({ fileList });
  };

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleRemove = (e) => {
    const { fileList } = this.state;
    fileList.map((i, index) => {
      if (i.name === e.name) { fileList.splice(index, 1); }
      return '';
    });

    this.setState(fileList);
  }

  handleSubmit = (e, isprev) => {
    if (!isprev) { e.preventDefault(); }
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { fileList, description } = this.state;
        // console.log(values);
        this.props.nextStep({ ...values, fileList, description });
      }
      console.log(...values);
    });
  }

  handleChangeCkE = (evt) => {
    this.setState({ description: evt.editor.getData() });
  }

  render() {
    // console.log('STEP ONE PROPS: ', this.props);
    // console.log('STEP ONE STATE: ', this.state);
    const {
      previewVisible, previewImage, fileList, description,
    } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { defValue } = this.props;
    return (
      <div style={{ marginTop: 30 }}>
        <Form onSubmit={this.handleSubmit} className={styles.otModalForm}>
          <Row>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                className={styles.formItem}
                label="Багцын нэр"
              >
                {getFieldDecorator('packagenm', {
                  initialValue: `${defValue.length === 0 ? '' : defValue.packagenm}`,
                  rules: [{
                    required: true, message: 'Багцын нэр заавал бөглөнө үү!',
                  }],
                })(
                  <Input
                    placeholder="Багцын нэр"
                  />,
                )}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                className={styles.formItem}
                label="Идэвхитэй эсэх"
              >
                {getFieldDecorator('isenable', {
                  initialValue: defValue.length === 0 ? false : defValue.isenable,
                  rules: [{
                    required: false,
                  }],
                })(
                  <Checkbox defaultChecked={defValue.length === 0 ? false : defValue.isenable} />,
                )}
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                className={styles.formItem}
                label="Богино тайлбар"
              >
                {getFieldDecorator('featuretxt', {
                  initialValue: `${defValue.length === 0 ? '' : defValue.featuretxt}`,
                  rules: [{
                    required: true, message: 'Богино тайлбар заавал бөглөнө үү!',
                  }],
                })(
                  <Input
                    placeholder="Богино тайлбар"
                  />,
                )}
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                className={styles.formItem}
                label="Багцын зураг"
                style={{ marginLeft: '3%' }}
              >
                {getFieldDecorator('imageList', {
                  initialValue: fileList,
                  rules: [{
                    required: true, message: 'Багцын зургийг заавал бөглөнө үү!',
                  }],
                })(
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
                  </Upload>,
                )}
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item className={styles.formItem} label="Дэлгэрэнгүй тайлбар" style={{ marginLeft: '3%', marginBottom: 0 }}>
                <CKEditor
                  activeClass="p10"
                  scriptUrl={'https://cdn.ckeditor.com/4.6.2/full/ckeditor.js'}
                  config={{ ckeToolbar }}
                  content={description}
                  events={{
                    change: this.handleChangeCkE,
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item className={styles.stepSaveBtn}>
                <Button type="primary" htmlType="submit"><Icon type="arrow-right" /></Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default Form.create({ name: 'normal_login' })(Component);
