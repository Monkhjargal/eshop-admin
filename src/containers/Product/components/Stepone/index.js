import React from "react";
import { Collapse, Form, Input, Col, Select } from "antd";
import Rate from "react-stars";

import styles from "../../styles.less";

// eslint-disable-next-line prefer-destructuring
const Panel = Collapse.Panel;
const text = `Good Luuck`;
const formatter = new Intl.NumberFormat("en-US");

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 17 },
};

const halfItemLayout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 10 },
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

class Component extends React.Component {
  state = {

  }
  render() {
    const { dataSource, filter } = this.props;
    console.log(dataSource, filter);
    return (
      <Collapse defaultActiveKey={['1', '2', '3', '4', '5', '6', '7']} className={styles.stepCollapse}>
        <Panel header="Ерөнхий мэдээлэл" key="1">
          <Col span={12}>
            <Form.Item {...formItemLayout} className={styles.formItem} label="Барааны нэр">
              <Input placeholder="Барааны нэр" value={dataSource.skucd} disabled />
            </Form.Item>
            <Form.Item {...formItemLayout} className={styles.formItem} label="Онлайн нэр">
              <Input placeholder="Онлайн нэр" value={dataSource.titlenm} />
            </Form.Item>
            <Form.Item {...formItemLayout} className={styles.formItem} label="Богино тайлбар">
              <Input placeholder="Богино тайлбар" value={dataSource.featuretext} />
            </Form.Item>
            <Form.Item {...formItemLayout} className={styles.formItem} label="Хаалтанд дахь нэр" >
              <Input placeholder="Хаалтанд дахь нэр" value={dataSource.backtxt} />
            </Form.Item>
            <Form.Item {...formItemLayout} className={styles.formItem} label="Ангилал"> <Input placeholder="Ангилал" /> </Form.Item>
            <Col span={12}>
              <Form.Item {...statusLayout} className={styles.formItem} label="Бренд">
                <Input placeholder="Бренд" value={dataSource.bibrandnm} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item {...halfItemLayout} className={styles.formItem} label="ХНС бренд">
                <Input placeholder="ХНС бренд" value={dataSource.bibrandnm} disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item {...statusLayout} className={styles.formItem} label="Төлөв">
                <Input disabled value={filter.productstatus.map(i => (i.id === dataSource.status ? i.name : ''))} className={styles.statusIn} />
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
              <Input placeholder="" value={dataSource.norevnnm} disabled />
            </Form.Item>
            <Col span={12}>
              <Form.Item {...halfItemLayout} className={styles.formItem} label="Хямдрал хувь">
                <Input placeholder="" value={`${dataSource.spercent}%`} disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item {...halfItemLayout} className={styles.formItem} label="Хугацаа">
                <Input placeholder="" disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item {...halfItemLayout} className={styles.formItem} label="Дундаж үнэлгээ">
                <Rate className="align-baseline" count={5} size={22} color2={'#ffb200'} value={dataSource.rate} edit={false} />
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
          <Col span={24}>
            <Col span={4} className={styles.imageCollapse} ><img alt="img-1" className={styles.imageList} src={`https://overclockers.ru/assets/noarticlepic.png`} /><figcaption>Үндсэн зураг</figcaption></Col>
            <Col span={4} className={styles.imageCollapse} ><img alt="img-2" className={styles.imageList} src={`https://overclockers.ru/assets/noarticlepic.png`} /></Col>
            <Col span={4} className={styles.imageCollapse} ><img alt="img-3" className={styles.imageList} src={`https://overclockers.ru/assets/noarticlepic.png`} /></Col>
            <Col span={4} className={styles.imageCollapse} ><img alt="img-4" className={styles.imageList} src={`https://overclockers.ru/assets/noarticlepic.png`} /></Col>
            <Col span={4} className={styles.imageCollapse} ><img alt="img-5" className={styles.imageList} src={`https://overclockers.ru/assets/noarticlepic.png`} /></Col>
          </Col>
        </Panel>
        <Panel header="Сагсны тохиргоо" key="4">
          <Col span={12}>
            <Form.Item {...cartLayout} className={styles.formItem} label="Нэг худалдан авалтанд хамгийн багдаа хэдэн нэгжээр зарах"> <Input placeholder="Нэг худалдан авалтанд хамгийн багдаа хэдэн нэгжээр зарах" /> </Form.Item>
            <Form.Item {...cartLayout} className={styles.formItem} label="Нэг худалдан авалтад авч болох боломжит тоо"> <Input placeholder="Нэг худалдан авалтад авч болох боломжит тоо" /> </Form.Item>
            <Form.Item {...cartLayout} className={styles.formItem} label="Кг-ын барааг гр-аар зарах бол тэмдэглэ"> <Input placeholder="Кг-ын барааг гр-аар зарах бол тэмдэглэ" /> </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item {...cartLayout} className={styles.formItem} label="Сагсанд хэдээр нэмэгдэх тоо"> <Input placeholder="Сагсанд хэдээр нэмэгдэх тоо" /> </Form.Item>
            <Form.Item {...cartLayout} className={styles.formItem} label="Гр-ын зарах хамгийн доод нэгж"> <Input placeholder="Гр-ын зарах хамгийн доод нэгж" /> </Form.Item>
            <Form.Item {...cartLayout} className={styles.formItem} label="Барааны нэр"> <Input placeholder="Барааны нэр" /> </Form.Item>
          </Col>
        </Panel>
        <Panel header="Шинэ барааны тохиргоо" key="5">
          <Col span={12}>
            <Form.Item {...cartLayout} className={styles.formItem} label="Шинэ бараа болгож харуулах бол тэмдэглэ"> <Input placeholder="Шинэ бараа болгож харуулах бол тэмдэглэ" /> </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item {...halfItemLayout} className={styles.formItem} label="Хугацаа"> <Input placeholder="Хугацаа" /> </Form.Item>
          </Col>
        </Panel>
        <Panel header="Нэмэлт тохиргоо" key="6">
          <Col span={12}>
            <Form.Item {...halfItemLayout} className={styles.formItem} label="Өнгө"> <Input placeholder="Өнгө" /> </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item {...halfItemLayout} className={styles.formItem} label="Хайлтын түлхүүр үгс"> <Input placeholder="Хугацаа" /> </Form.Item>
          </Col>
        </Panel>
        <Panel header="Дэлгэрэнгүй бүртгэл" key="7">
          <p>{text}</p>
        </Panel>
        <Panel header="Мэдээлэл шинэчлэлт / Системийн мэдээлэл" key="8">
          <p>{text}</p>
        </Panel>
      </Collapse>
    );
  }
}

export default Component;
