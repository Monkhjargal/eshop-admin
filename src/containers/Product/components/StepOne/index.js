import React from "react";
import {
  Collapse,
  Form,
  Input,
  Col,
  Row,
  Checkbox,
  InputNumber,
  DatePicker,
  Upload,
  Icon,
  Modal,
  Select,
  Button,
  Spin,
} from "antd";
import Rate from "react-stars";
import moment from "moment";
import CKEditor from "react-ckeditor-component";

import { SelectTreeWidget } from "../../../../components/Form/Widgets";
import { StatusChangeHistory } from "../";
import styles from "../../styles.less";


// eslint-disable-next-line prefer-destructuring
const Panel = Collapse.Panel;
const formatter = new Intl.NumberFormat("en-US");
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const picserver = 'http://202.55.180.199:8877/';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 17 },
};

const halfItemLayout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 10 },
};

const discountLayout = {
  labelCol: { span: 18 },
  wrapperCol: { span: 6 },
};

const dateLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const statusLayout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
};

const historyLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
};

const cartLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 13 },
};

const searchKeyLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const updatelayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 13 },
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
  constructor(props) {
    super(props);

    this.state = {
      update: [{}],
      images: [],
      previewVisible: false,
      previewImage: '',
      loading: true,
      skucd: null,
      ishistory: false,
    };
  }

  componentWillMount() { this.refresh(); }

  refresh = () => {
    this.props.getDetail({ skucd: this.props.skucd }).then((res) => {
      const files = [];
      this.props.detail.files.map((i, index) => files.push({ url: picserver + i, name: i, uid: index }));
      this.setState({
        loading: false,
        update: { ...this.props.detail },
        skucd: this.props.skucd,
        images: files,
      });
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
    this.setState({ images: fileList });
  }

  handleChange = (e) => {
    // console.log(e.value.target.value);
    const { update } = this.state;
    update[e.name] = e.value.target === undefined ? e.value : e.value.target.value === undefined ? e.value.target.checked : e.value.target.value;
    this.setState(update);
  }

  handleSave = () => {
    const { update, images } = this.state;
    let data = new FormData();
    images.map(i => data.append("files", i.originFileObj, i.name));
    images.map(i => (i.originFileObj === undefined ? data.append("imgnm", i.name) : ''));
    Object.keys(update).map(keyname => data.append(keyname, update[keyname]));

    const isfiles = true;
    this.props.updateProduct({ body: data, skucd: update.skucd, isfiles }).then((res) => {
      if (update.catid !== null) { this.props.nextStep(); }
    });
  }

  handleCke = (evt) => {
    // console.log(evt.editor.getData());
    const { update } = this.state;
    update.description = evt.editor.getData();
    this.setState({ update });
  };

  handleChangeDate = (e) => {
    const { update } = this.state;
    update.sdate = moment(e[0]._d + 1, dateFormat);
    update.edate = moment(e[1]._d + 1, dateFormat);
    this.setState(update);
  }

  handleHistoryModal = () => { this.setState({ ishistory: !this.state.ishistory }); }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleChangeCat = (e) => {
    const { update } = this.state;
    update.catid = e;
    this.setState(update);
  }

  handleRemove = (e) => {
    const { images } = this.state;
    images.map((i, index) => {
      if (i.name === e.name) { images.splice(index, 1); }
      return '';
    });

    this.setState(images);
  }

  render() {
    const { detail, filter } = this.props;
    const {
      previewVisible, previewImage, update, skucd, images,
    } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    if (skucd !== this.props.skucd) {
      this.refresh();
    }

    if (!this.state.loading) {
      return (
        <div style={{ width: '100%' }}>
          <Collapse defaultActiveKey={['1', '2', '3', '4', '5', '6', '7', '8']} className={styles.stepCollapse}>
            <Panel header="Ерөнхий мэдээлэл" key="1" >
              <Form style={{ width: '100%' }}>
                <Col span={12}>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="Барааны код">
                    <Input placeholder="Барааны нэр" value={detail.skucd} disabled />
                  </Form.Item>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="Онлайн нэр">
                    <Input placeholder="Онлайн нэр" defaultValue={detail.titlenm} onChange={(val) => { this.handleChange({ name: 'titlenm', value: val }); }} />
                  </Form.Item>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="Богино тайлбар">
                    <Input placeholder="Богино тайлбар" defaultValue={detail.featuretxt} onChange={(val) => { this.handleChange({ name: 'featuretxt', value: val }); }} />
                  </Form.Item>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="Хаалтанд дахь нэр" >
                    <Input placeholder="Хаалт дахь нэр" defaultValue={detail.backtxt} onChange={(val) => { this.handleChange({ name: 'backtxt', value: val }); }} />
                  </Form.Item>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="Ангилал">
                    <SelectTreeWidget
                      style={{ width: '100%' }}
                      value={update.catid}
                      schema={{ options: filter.catids }}
                      onChange={this.handleChangeCat}
                      placeholder="Ангилал"
                    />
                  </Form.Item>
                  <Col span={12}>
                    <Form.Item {...statusLayout} className={styles.formItem} label="Бренд">
                      <Select placeholder="Бренд" style={{ width: '100%' }} defaultValue={detail.brandnm} onChange={val => this.handleChange({ name: 'brandid', value: val })}>
                        {filter.brandids && filter.brandids.map(i => <Select.Option key={i.id}>{i.name}</Select.Option>)}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item {...halfItemLayout} className={styles.formItem} label="ХНС бренд">
                      <Input placeholder="ХНС бренд" value={detail.bibrandnm} disabled />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item {...statusLayout} className={styles.formItem} label="Төлөв">
                      <Input
                        disabled
                        value={filter.productstatus.find(i => (i.id === detail.status)) === undefined ? '' : filter.productstatus.find(i => (i.id === detail.status)).name}
                        className={detail.status === 1 ? styles.statusOne : detail.status === 2 ? styles.statusTwo : styles.statusThree}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item {...historyLayout} className={styles.formItemhistory} label=""> <a onClick={this.handleHistoryModal} >Төлөв өөрчлөлтийн түүх</a> </Form.Item>
                  </Col>
                </Col>
                <Col span={12}>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="ХНС-ийн нэр" >
                    <Input placeholder="ХНС-ийн нэр" value={detail.titlenm} disabled />
                  </Form.Item>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="Гарал үүсэл">
                    <Input placeholder="Гарал үүсэл" value={detail.countrynm} disabled />
                  </Form.Item>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="Хэмжих нэгж">
                    <Input placeholder="Хэмжих нэгж" value={detail.measurenm} disabled />
                  </Form.Item>
                  <Col span={12}>
                    <Form.Item {...halfItemLayout} className={styles.formItem} label="Худалдах үнэ">
                      <Input placeholder="Худалдах үнэ" value={`${formatter.format(detail.sprice)}₮`} disabled />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item {...halfItemLayout} className={styles.formItem} label="Хямдралтай үнэ">
                      <Input placeholder="" value={`${formatter.format(detail.newprice)}₮`} disabled />
                    </Form.Item>
                  </Col>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="Хямдрал нэр">
                    <Input value={detail.norevnnm} disabled />
                  </Form.Item>
                  <Col span={8}>
                    <Form.Item {...discountLayout} className={styles.formItem} label="Хямдрал хувь">
                      <Input className={styles.discountPercnt} value={`${detail.spercent}%`} disabled />
                    </Form.Item>
                  </Col>
                  <Col span={15}>
                    <Form.Item {...dateLayout} className={styles.formItem} label="Хугацаа">
                      <Row className={styles.dateformItem}>
                        <Input disabled value={detail.esdate ? moment(detail.esdate).format('YYYY-MM-DD') : ''} /> {` - `}
                        <Input disabled value={detail.eedate ? moment(detail.eedate).format('YYYY-MM-DD') : ''} />
                      </Row>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item {...halfItemLayout} className={styles.formItem} label="Дундаж үнэлгээ">
                      <Rate className="align-baseline" count={5} size={22} color2={'#ffb200'} value={detail.rate} edit={false} />
                      {/* <t>{detail.rate}</t> */}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item {...halfItemLayout} className={styles.formItem} label="Хэрэглэгч тоо">
                      <Input placeholder="" value={detail.ratecnt} disabled />
                    </Form.Item>
                  </Col>
                </Col>
              </Form>
            </Panel>
            <Panel header="Зургийн тохиргоо" key="2">
              <Upload
                accept={".jpg,.png,.jpeg,.gif"}
                action="//jsonplaceholder.typicode.com/posts/"
                listType="picture-card"
                fileList={images}
                onPreview={this.handlePreview}
                onRemove={this.handleRemove}
                onChange={this.handleChangeImg}
              >
                {images.length >= 5 ? null : uploadButton}
              </Upload>
              <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </Panel>
            <Panel header="Сагсны тохиргоо (Нэг худалдан авалтад)" key="4">
              <Col span={12}>
                <Form.Item {...cartLayout} className={styles.formItem} label="Хамгийн багадаа хэдэн нэгжээр зарах">
                  <InputNumber min={0} defaultValue={detail.saleminqty} onChange={(val) => { this.handleChange({ name: 'saleminqty', value: val }); }} />
                </Form.Item>
                <Form.Item {...cartLayout} className={styles.formItem} label="Худалдан авч болох боломжит тоо">
                  <InputNumber min={0} defaultValue={detail.salemaxqty} onChange={(val) => { this.handleChange({ name: 'salemaxqty', value: val }); }} />
                </Form.Item>
                <Form.Item {...cartLayout} className={styles.formItem} label="Кг-ын барааг гр-аар зарах бол тэмдэглэ">
                  <Checkbox defaultChecked={detail.issalekg} onChange={(val) => { this.handleChange({ name: 'issalekg', value: val }); }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...halfItemLayout} className={styles.formItem} label="Сагсанд хэдээр нэмэгдэх тоо">
                  <InputNumber min={0} defaultValue={detail.addminqty} onChange={(val) => { this.handleChange({ name: 'addminqty', value: val }); }} />
                </Form.Item>
                <Form.Item {...halfItemLayout} className={styles.formItem} label="Гр-ын зарах хамгийн доод нэгж">
                  <InputNumber min={0} defaultValue={detail.saleweight} onChange={(val) => { this.handleChange({ name: 'saleweight', value: val }); }} />
                </Form.Item>
              </Col>
            </Panel>
            <Panel header="Шинэ барааны тохиргоо" key="5">
              <Col span={12}>
                <Form.Item {...cartLayout} className={styles.formItem} label="Шинэ бараа болгож харуулах бол тэмдэглэ">
                  <Checkbox defaultChecked={detail.isnew} onChange={(val) => { this.handleChange({ name: 'isnew', value: val }); }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...halfItemLayout} className={styles.formItem} label="Хугацаа">
                  <RangePicker
                    defaultValue={[moment(detail.sdate, dateFormat), moment(detail.edate + 30, dateFormat)]}
                    format={dateFormat}
                    onChange={this.handleChangeDate}
                  />
                </Form.Item>
              </Col>
            </Panel>
            <Panel header="Нэмэлт тохиргоо" key="6">
              <Col span={6}>
                <Form.Item {...halfItemLayout} className={styles.formItem} label="Өнгө">
                  <Select placeholder="Өнгө" style={{ width: '100%' }} defaultValue={detail.colornm} onChange={(val) => { this.handleChange({ name: 'colorid', value: val }); }}>
                    {filter.colors && filter.colors.map(i => <Select.Option key={i.id}>{i.name}</Select.Option>)}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={17}>
                <Form.Item {...searchKeyLayout} className={styles.formItem} label="Хайлтын түлхүүр үгс">
                  <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    placeholder="Хайлтын түлхүүр үгс"
                    defaultValue={detail.keywords}
                    onChange={(val) => { this.handleChange({ name: 'keywords', value: val }); }}
                  />
                </Form.Item>
              </Col>
            </Panel>
            <Panel header="Дэлгэрэнгүй бүртгэл" key="7">
              <CKEditor
                activeClass="p10"
                content={update.description}
                scriptUrl={'https://cdn.ckeditor.com/4.6.2/full/ckeditor.js'}
                config={{ ckeToolbar }}
                events={{
                  change: this.handleCke,
                }}
              />
            </Panel>
            <Panel header="Мэдээлэл шинэчлэлт / Системийн мэдээлэл" key="8">
              <Col span={12}>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Зассан хэрэглэгч">
                  <Input placeholder="Зассан хэрэглэгч" value={detail.updemp} disabled />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Зассан огноо">
                  <Input placeholder="Зассан огноо" value={detail.updymd} disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...updatelayout} className={styles.formItem} label="Шинэчлэгдсэн огноо">
                  <Input placeholder="Шинэчлэгдсэн огноо" value={detail.updymd} disabled />
                </Form.Item>
              </Col>
            </Panel>
            {/* </Form> */}
          </Collapse>

          <div className={styles.stepSaveBtn}>
            <Button type="primary" onClick={this.handleSave}>Хадгалах</Button>
          </div>

          <StatusChangeHistory
            visible={this.state.ishistory}
            onCancel={this.handleHistoryModal}
          />
        </div>
      );
    }

    return (
      <div style={{ marginLeft: '49%', paddingTop: '15%', paddingBottom: '15%' }}><Spin /></div>
    );
  }
}

const StepOne = Form.create({ name: 'step_one' })(Component);
export default StepOne;
