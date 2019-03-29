import React from "react";
import {
  Form,
  Input,
  Col,
  Row,
  Select,
  Icon,
  Upload,
  Modal,
  Button,
} from "antd";
import CKEditor from "react-ckeditor-component";
import styles from "../../styles.less";

let defurl = "https://cdn.ckeditor.com/4.6.2/full/ckeditor.js";

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 17 },
};

class Component extends React.Component {
  handleChange = ({ fileList }) => this.setState({ fileList });

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  render() {
    console.log(this.props);
    const { dataSource, filter, auth } = this.props;
    // const { previewVisible, previewImage, fileList } = this.state;
    const { getFieldDecorator } = this.props.form;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div style={{ marginTop: "30px" }}>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                className={styles.formItem}
                label="Багцын нэр"
              >
                {getFieldDecorator('packagenm', {
                  initialValue: dataSource.packagenm,
                  rules: [{
                    required: true, message: 'Please fill your name!',
                  }],
                })(
                  <Input
                    placeholder="Багцын нэр"
                    disabled
                  />,
                )}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                className={styles.formItem}
                label="Идэвхитэй эсэх"
              >
                {getFieldDecorator('isenable', {
                  initialValue: dataSource.isenable,
                  rules: [{
                    required: true, message: 'Please fill your name!',
                  }],
                })(
                  <Select
                    // defaultValue={dataSource.isenable}
                    style={{ width: "100%" }}
                  >
                    <Option value={1}>Тийм</Option>
                    <Option value={0}>Үгүй</Option>
                  </Select>,
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
                  initialValue: dataSource.featuretxt,
                  rules: [{
                    required: true, message: 'Please fill your featuretxt!',
                  }],
                })(
                  <Input
                    placeholder="Богино тайлбар"
                    // value={dataSource.featuretxt}
                    disabled
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <div className="clearfix">
                {getFieldDecorator('imgnm', {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile,
                })(
                  <Upload name="logo" headers={{ Authorization: `Bearer ${auth.data.value.access_token}` }} action="http://202.55.180.199:8881/api/image/banner" listType="picture">
                    <Button>
                      <Icon type="upload" /> Click to upload
                    </Button>
                  </Upload>,
                )}
              </div>
            </Col>
            <Col span={24}>
              <div>
                {getFieldDecorator('description', {
                  initialValue: dataSource.description,
                  rules: [{
                    required: true, message: 'Please fill your featuretxt!',
                  }],
                })(
                  <CKEditor
                    activeClass="p10"
                    content={dataSource.description}
                    scriptUrl={defurl}
                    config={{
                      toolbar: [
                        {
                          name: "document",
                          items: [
                            "Source",
                            "Save",
                            "NewPage",
                            "Preview",
                            "Print",
                            "-",
                            "Templates",
                          ],
                        },
                        {
                          name: "clipboard",
                          items: [
                            "Cut",
                            "Copy",
                            "Paste",
                            "PasteText",
                            "PasteFromWord",
                            "-",
                            "Undo",
                            "Redo",
                          ],
                        },
                        {
                          name: "editing",
                          items: [
                            "Find",
                            "Replace",
                            "-",
                            "SelectAll",
                            "-",
                            "Scayt",
                          ],
                        },
                        {
                          name: "forms",
                          items: [
                            "Form",
                            "Checkbox",
                            "Radio",
                            "TextField",
                            "Textarea",
                            "Select",
                            "Button",
                            "ImageButton",
                            "HiddenField",
                          ],
                        },
                        "/",
                        {
                          name: "basicstyles",
                          items: [
                            "Bold",
                            "Italic",
                            "Underline",
                            "Strike",
                            "Subscript",
                            "Superscript",
                            "-",
                            "CopyFormatting",
                            "RemoveFormat",
                          ],
                        },
                        {
                          name: "paragraph",
                          items: [
                            "NumberedList",
                            "BulletedList",
                            "-",
                            "Outdent",
                            "Indent",
                            "-",
                            "Blockquote",
                            "CreateDiv",
                            "-",
                            "JustifyLeft",
                            "JustifyCenter",
                            "JustifyRight",
                            "JustifyBlock",
                            "-",
                            "BidiLtr",
                            "BidiRtl",
                            "Language",
                          ],
                        },
                        { name: "links", items: ["Link", "Unlink", "Anchor"] },
                        {
                          name: "insert",
                          items: [
                            "Image",
                            "Flash",
                            "Table",
                            "HorizontalRule",
                            "Smiley",
                            "SpecialChar",
                            "PageBreak",
                            "Iframe",
                          ],
                        },
                        "/",
                        {
                          name: "styles",
                          items: ["Styles", "Format", "Font", "FontSize"],
                        },
                        { name: "colors", items: ["TextColor", "BGColor"] },
                        { name: "tools", items: ["Maximize", "ShowBlocks"] },
                        { name: "about", items: ["About"] },
                      ],
                    }}
                    events={
                      {
                        // change: onChange,
                      }
                    }
                  />,
                )}
              </div>
            </Col>
          </Row>
          <div className={styles.stepSaveBtn}>
            <Button type="primary" htmlType="submit">Хадгалаад дараагийн хуудасруу орох</Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default Form.create({ name: 'normal_login' })(Component);
