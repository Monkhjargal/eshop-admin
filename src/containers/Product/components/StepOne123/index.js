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

import styles from "../../styles.less";
import { CkEditorWidget } from "../../../../components/Form/Widgets/";

// eslint-disable-next-line prefer-destructuring
const Panel = Collapse.Panel;
const formatter = new Intl.NumberFormat("en-US");
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

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
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const cartLayout = {
  labelCol: { span: 19 },
  wrapperCol: { span: 5 },
};

const searchKeyLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const updatelayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 13 },
};

class Component extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      update: [{}],
      images: [],
      skucd: null,
      previewVisible: false,
      previewImage: '',
    };
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
    this.props.updateProduct({ body: { ...update }, skucd: update.skucd });
    // console.log(this.state.update.skucd);
  }

  handlecke = () => { }

  render() {
    const { dataSource, filter } = this.props;
    const { previewVisible, previewImage } = this.state;
    const { images } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    console.log(this.props.dataSource);
    if (this.state.skucd !== this.props.dataSource.skucd && this.props.detail !== undefined) {
      // console.log(this.props.detail);
      this.setState({
        update: { ...this.props.dataSource },
        skucd: this.props.dataSource.skucd,
        images: this.props.detail.files,
      });
    }

    if (this.state.skucd !== null) {
      return (
        <div style={{ width: '100%' }}>
          <Collapse defaultActiveKey={['1', '2', '3', '4', '5', '6', '7', '8']} className={styles.stepCollapse}>
            {/* <Form onSubmit={this.handleSubmit}> */}
            <Panel header="Ерөнхий мэдээлэл" key="1" >
              <Col span={12}>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Барааны нэр">
                  <Input placeholder="Барааны нэр" value={dataSource.skucd} disabled />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Онлайн нэр">
                  <Input placeholder="Онлайн нэр" defaultValue={dataSource.titlenm} onChange={(val) => { this.handleChange({ name: 'titlenm', value: val }); }} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Богино тайлбар">
                  <Input placeholder="Богино тайлбар" defaultValue={dataSource.featuretext} onChange={(val) => { this.handleChange({ name: 'featuretext', value: val }); }} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Хаалтанд дахь нэр" >
                  <Input placeholder="Хаалтанд дахь нэр" defaultValue={dataSource.backtxt} onChange={(val) => { this.handleChange({ name: 'backtxt', value: val }); }} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Ангилал">
                  <Select placeholder="Ангилал" style={{ width: '100%' }} defaultValue={dataSource.catnm} onChange={val => this.handleChange({ name: 'catid', value: val })}>
                    {filter.catids && filter.catids.map(i => <Select.Option key={i.id}>{i.name}</Select.Option>)}
                  </Select>
                </Form.Item>
                <Col span={12}>
                  <Form.Item {...statusLayout} className={styles.formItem} label="Бренд">
                    <Select placeholder="Бренд" style={{ width: '100%' }} defaultValue={dataSource.brandnms} onChange={val => this.handleChange({ name: 'brandid', value: val })}>
                      {filter.brandids && filter.brandids.map(i => <Select.Option key={i.id}>{i.name}</Select.Option>)}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item {...halfItemLayout} className={styles.formItem} label="ХНС бренд">
                    <Input placeholder="ХНС бренд" value={dataSource.bibrandnm} disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item {...statusLayout} className={styles.formItem} label="Төлөв">
                    <Input disabled value={filter && filter.productstatus && filter.productstatus.map(i => (i.id === dataSource.status ? i.name : ''))} className={styles.statusIn} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item {...historyLayout} className={styles.formItemhistory} label=""> <a>Төлөв өөрчлөлтийн түүх</a> </Form.Item>
                </Col>
              </Col>
              <Col span={12}>
                <Form.Item {...formItemLayout} className={styles.formItem} label="ХНС-ийн нэр" >
                  <Input placeholder="ХНС-ийн нэр" value={dataSource.titlenm} disabled />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Гарал үүсэл">
                  <Input placeholder="Гарал үүсэл" value={dataSource.countrynm} disabled />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Хэмжих нэгж">
                  <Input placeholder="Хэмжих нэгж" value={dataSource.measurenm} disabled />
                </Form.Item>
                <Col span={12}>
                  <Form.Item {...halfItemLayout} className={styles.formItem} label="Худалдах үнэ">
                    <Input placeholder="Худалдах үнэ" value={`${formatter.format(dataSource.sprice)}₮`} disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item {...halfItemLayout} className={styles.formItem} label="Хямдралтай үнэ">
                    <Input placeholder="" value={`${formatter.format(dataSource.newprice)}₮`} disabled />
                  </Form.Item>
                </Col>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Хямдрал нэр">
                  <Input value={dataSource.norevnnm} disabled />
                </Form.Item>
                <Col span={8}>
                  <Form.Item {...discountLayout} className={styles.formItem} label="Хямдрал хувь">
                    <Input className={styles.discountPercnt} value={`${dataSource.spercent}%`} disabled />
                  </Form.Item>
                </Col>
                <Col span={15}>
                  <Form.Item {...dateLayout} className={styles.formItem} label="Хугацаа">
                    <Row className={styles.dateformItem}>
                      <Input disabled value={dataSource.esdate ? moment(dataSource.esdate).format('YYYY-MM-DD') : ''} /> {` - `}
                      <Input disabled value={dataSource.eedate ? moment(dataSource.eedate).format('YYYY-MM-DD') : ''} />
                    </Row>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item {...halfItemLayout} className={styles.formItem} label="Дундаж үнэлгээ">
                    <Rate className="align-baseline" count={5} size={22} color2={'#ffb200'} value={dataSource.rate} edit={false} />
                    {/* <b>{dataSource.rate}</b> */}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item {...halfItemLayout} className={styles.formItem} label="Хэрэглэгч тоо">
                    <Input placeholder="" value={dataSource.ratecnt} disabled />
                  </Form.Item>
                </Col>
              </Col>
            </Panel>
            <Panel header="Зургийн тохиргоо" key="2">
              <Upload
                action="//jsonplaceholder.typicode.com/posts/"
                listType="picture-card"
                fileList={[]}
                onPreview={this.handlePreview}
                onChange={this.handleChangeImg}
              >
                {uploadButton}
              </Upload>
              <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </Panel>
            <Panel header="Сагсны тохиргоо" key="4">
              <Col span={12}>
                <Form.Item {...cartLayout} className={styles.formItem} label="Нэг худалдан авалтанд хамгийн багадаа хэдэн нэгжээр зарах">
                  <InputNumber min={0} defaultValue={dataSource.saleminqty} onChange={(val) => { this.handleChange({ name: 'saleminqty', value: val }); }} />
                </Form.Item>
                <Form.Item {...cartLayout} className={styles.formItem} label="Нэг худалдан авалтад авч болох боломжит тоо">
                  <InputNumber min={0} defaultValue={dataSource.salemaxqty} onChange={(val) => { this.handleChange({ name: 'salemaxqty', value: val }); }} />
                </Form.Item>
                <Form.Item {...cartLayout} className={styles.formItem} label="Кг-ын барааг гр-аар зарах бол тэмдэглэ">
                  <Checkbox defaultChecked={dataSource.issalekg} onChange={(val) => { this.handleChange({ name: 'issalekg', value: val }); }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...cartLayout} className={styles.formItem} label="Сагсанд хэдээр нэмэгдэх тоо">
                  <InputNumber min={0} defaultValue={dataSource.addminqty} onChange={(val) => { this.handleChange({ name: 'addminqty', value: val }); }} />
                </Form.Item>
                <Form.Item {...cartLayout} className={styles.formItem} label="Гр-ын зарах хамгийн доод нэгж">
                  <InputNumber min={0} defaultValue={dataSource.saleweight} onChange={(val) => { this.handleChange({ name: 'saleweight', value: val }); }} />
                </Form.Item>
              </Col>
            </Panel>
            <Panel header="Шинэ барааны тохиргоо" key="5">
              <Col span={12}>
                <Form.Item {...cartLayout} className={styles.formItem} label="Шинэ бараа болгож харуулах бол тэмдэглэ">
                  <Checkbox defaultChecked={dataSource.isnew} onChange={(val) => { this.handleChange({ name: 'isnew', value: val }); }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...halfItemLayout} className={styles.formItem} label="Хугацаа">
                  <RangePicker
                    defaultValue={[moment(dataSource.sdate, dateFormat), moment(dataSource.edate, dateFormat)]}
                    format={dateFormat}
                  />
                </Form.Item>
              </Col>
            </Panel>
            <Panel header="Нэмэлт тохиргоо" key="6">
              <Col span={6}>
                <Form.Item {...halfItemLayout} className={styles.formItem} label="Өнгө">
                  <Select placeholder="Хайлтын түлхүүр үгс" style={{ width: '100%' }} defaultValue={dataSource.colornm} onChange={(val) => { this.handleChange({ name: 'colorid', value: val }); }}>
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
                    onChange={(val) => { this.handleChange({ name: 'keywords', value: val }); }}
                  />
                </Form.Item>
              </Col>
            </Panel>
            <Panel header="Дэлгэрэнгүй бүртгэл" key="7">
              <CkEditorWidget value={this.state.update.description} onChange={this.handlecke} />
            </Panel>
            <Panel header="Мэдээлэл шинэчлэлт / Системийн мэдээлэл" key="8">
              <Col span={12}>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Зассан хэрэглэгч">
                  <Input placeholder="Зассан хэрэглэгч" value={dataSource.updemp} disabled />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Зассан огноо">
                  <Input placeholder="Зассан огноо" value={dataSource.updymd} disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...updatelayout} className={styles.formItem} label="Шинэчлэгдсэн огноо">
                  <Input placeholder="Шинэчлэгдсэн огноо" value={dataSource.updymd} disabled />
                </Form.Item>
              </Col>
            </Panel>
            {/* </Form> */}
          </Collapse>

          <div className={styles.stepSaveBtn}>
            <Button type="primary" onClick={this.handleSave}>Хадгалах</Button>
          </div>
        </div>
      );
    }

    return (
      <div style={{ marginLeft: '49%', paddingTop: '15%', paddingBottom: '15%' }}><Spin /></div>
    );
  }
}

export default Component;
