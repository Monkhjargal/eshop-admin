import React from 'react';
import { Card, Button, Table, Spin, Form, Input, Col, Row, Select } from "antd";
import PageHeaderLayout from "../../layouts/PageHeaderLayout";

import styles from '../../components/List/style.less';
import tableStyle from "../../components/StandardTable/index.less";
import style from "./styles.less";

class Product extends React.Component {
  state = {
    name: 'Product',
    selectedId: null,
    filter: {
      skunm: '',
      attributeids: [],
      attrvalueids: [],
      catids: [],
      brandids: [],
      isnewproduct: [],
      isevnnormal: [],
      evnnormalids: [],
      productstatus: [],
      isproductchanged: [],
      ispricechanged: [],
      updemps: [],
    },
    body: {
      limit: 20,
      page: 1,
      filtered: {},
      sorted: [],
    },
  }

  handleRowClick = (record) => {
    this.setState({ selectedId: record.id });
  }

  renderFooter = () => (
    <div className={tableStyle.tableFooter}>
      <div className={tableStyle.footerInfo}>
        Нийт: {this.props.dataSource.data.length}
      </div>
    </div>
  );

  handleFilterInput = (e) => {
    const { filter } = this.state;
    filter.skunm = e.target.value;
    this.setState(filter);
  }

  handleChange = (e) => {
    const { filter } = this.state;
    filter[e.name] = e.value;
    this.setState(filter);
  }

  handleSearch = () => {
    const { filter } = this.state;
    const { body } = this.state;
    body.filtered = filter;
    this.props.getDataSource({ body });
    console.log(body);
  }

  renderFilterFields = () => {
    const filter = this.props.dataSource.filter[0];
    return (
      <div>
        <Form className={style.otform}>
          <Row>
            <Col span={6}>
              <Form.Item label="Барааны нэр" className={style.formItem}>
                <Input size={'small'} placeholder="Барааны нэр хайх" style={{ width: '96%' }} onChange={this.handleFilterInput} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Аттрибут">
                <Select
                  mode="multiple"
                  size={'small'}
                  placeholder="Аттрибут хайх"
                  style={{ width: '96%' }}
                  onChange={(val) => { this.handleChange({ name: 'attributeids', value: val }); }}
                >
                  { filter.attributeids.map(i => <Select.Option key={i.id}>{i.name}</Select.Option>) }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Ангилал">
                <Select
                  mode="multiple"
                  size={'small'}
                  placeholder="Ангилал хайх"
                  style={{ width: '96%' }}
                  onChange={(val) => { this.handleChange({ name: 'catids', value: val }); }}
                >
                  { filter.catids.map(i => <Select.Option key={i.id}>{i.name}</Select.Option>) }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Аттрибутын утга">
                <Select
                  mode="multiple"
                  size={'small'}
                  placeholder="Аттрибутын утга хайх"
                  style={{ width: '96%' }}
                  onChange={(val) => { this.handleChange({ name: 'attrvalueids', value: val }); }}
                >
                  { filter.attrvalueids.map(i => <Select.Option key={i.id}>{i.name}</Select.Option>) }
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Form.Item label="Бренд">
                <Select
                  mode="multiple"
                  size={'small'}
                  placeholder="Бренд хайх"
                  style={{ width: '96%' }}
                  onChange={(val) => { this.handleChange({ name: 'brandids', value: val }); }}
                >
                  { filter.brandids.map(i => <Select.Option key={i.id}>{i.name}</Select.Option>) }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Шинэ бараа эсэх">
                <Select
                  size={'small'}
                  placeholder="Шинэ бараа эсэх хайх"
                  style={{ width: '96%' }}
                  onChange={(val) => { this.handleChange({ name: 'isnewproduct', value: val }); }}
                >
                  { filter.isnewproduct.map(i => <Select.Option key={i.id === '' ? 0 : i.id}>{i.name}</Select.Option>) }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Хямдралтай эсэх" className={style.formItem}>
                <Select
                  size={'small'}
                  placeholder="Хямдралтай эсэх хайх"
                  style={{ width: '96%' }}
                  onChange={(val) => { this.handleChange({ name: 'isevnnormal', value: val }); }}
                >
                  { filter.isevnnormal.map(i => <Select.Option key={i.id === '' ? 0 : i.id}>{i.name}</Select.Option>) }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Онлайн төлөв">
                <Select
                  mode="multiple"
                  size={'small'}
                  placeholder="Онлайн төлөв хайх"
                  style={{ width: '96%' }}
                  onChange={(val) => { this.handleChange({ name: 'productstatus', value: val }); }}
                >
                  { filter.productstatus.map(i => <Select.Option key={i.id === '' ? 'all' : i.id}>{i.name}</Select.Option>) }
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Form.Item label="Хямдрал">
                <Select
                  mode="multiple"
                  size={'small'}
                  placeholder="Хямдрал хайх"
                  style={{ width: '96%' }}
                  onChange={(val) => { this.handleChange({ name: 'evnnormalids', value: val }); }}
                >
                  {filter.evnnormalids.map(i => <Select.Option key={i.id}>{i.name}</Select.Option>) }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Мэдээлэл шинэчлэлт">
                <Select
                  size={'small'}
                  placeholder="Мэдээлэл шинэчлэлт хайх"
                  style={{ width: '96%' }}
                  onChange={(val) => { this.handleChange({ name: 'isproductchanged', value: val }); }}
                >
                  {filter.isproductchanged.map(i => <Select.Option key={i.id === '' ? 0 : i.id}>{i.name}</Select.Option>) }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Үнийн өөрчлөлт орсон бараа">
                <Select
                  mode="multiple"
                  size={'small'}
                  placeholder="Үнийн өөрчлөлт орсон бараа хайх"
                  style={{ width: '96%' }}
                  onChange={(val) => { this.handleChange({ name: 'ispricechanged', value: val }); }}
                >
                  {filter.ispricechanged.map(i => <Select.Option key={i.id === '' ? 0 : i.id}>{i.name}</Select.Option>) }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Зассан хэрэглэгч">
                <Select
                  mode="multiple"
                  size={'small'}
                  placeholder="Зассан хэрэглэгч хайх"
                  style={{ width: '96%' }}
                  onChange={(val) => { this.handleChange({ name: 'updemps', value: val }); }}
                />
              </Form.Item>
            </Col>
          </Row>
          <div className="ant-modal-footer" style={{ marginBottom: 15 }}>
            <Button size="small" type="button" >{'Цэвэрлэх'}</Button>
            <Button size="small" htmlType="submit" loading={this.props.dataIsLoading} type="primary" onClick={this.handleSearch} >{'Хайх'}</Button>
          </div>
        </Form>
      </div>
    );
  }

  renderEditButton = () => (
    <div className={styles.tableListOperator}>
      <Button
        icon="edit"
        size="small"
        type="dashed"
        // disabled={!this.state.selectedId}
        className={`${styles.formbutton} ${styles.update}`}
      >
        {`${this.state.name} засах`}
      </Button>
    </div>
  )

  renderTable = () => (
    <div className={tableStyle.standardTable}>
      <Table
        dataSource={this.props.dataSource.data}
        columns={this.props.dataSource.headers}
        size="small"
        bordered={false}
        rowKey={record => record.id}
        pagination={{ defaultPageSize: 11 }}
        footer={this.renderFooter}
        onRow={record => ({
          onClick: () => this.handleRowClick(record),
        })}
      />
    </div>
  )

  render() {
    // console.log(this.props.dataSource);
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div >
            {
              this.props.dataSource.data === undefined ? <div style={{ marginLeft: '49%', paddingTop: '15%', paddingBottom: '15%' }}><Spin /></div> : (
                <div className={styles.tableList} style={{ overflow: 'hidden', overflowX: 'auto' }}>
                  {this.renderFilterFields()}
                  {this.renderEditButton()}
                  {this.renderTable()}
                </div>
              )
            }
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}

export default Product;
