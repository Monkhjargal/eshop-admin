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
      attribute: [],
      category: [],
      brand: [],
      newproduct: [],
      status: [],
      discount: [],
      update: [],
      scproduct: [],
      upuser: [],
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
    console.log(e);
  }

  renderFilterFields = () => {
    const filter = this.props.dataSource.filter[0];
    console.log(filter);
    return (
      <div>
        <Form className={style.otform}>
          <Row>
            <Col span={12}>
              <Form.Item label="Барааны нэр" className={style.formItem}>
                <Input size={'small'} placeholder="SKU код" style={{ width: '95%' }} onChange={this.handleFilterInput} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Аттрибут">
                <Select
                  mode="multiple"
                  size={'small'}
                  placeholder="Please select"
                  style={{ width: '95%' }}
                  onChange={this.handleChange}
                >
                  { filter.attribute.map((i, key) => <Select.Option key={key}>{i}</Select.Option>) }
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="Ангилал">
                <Select
                  mode="multiple"
                  size={'small'}
                  placeholder="Please select"
                  style={{ width: '95%' }}
                >
                  { filter.catid.map((i, key) => <Select.Option key={key}>{i.name}</Select.Option>) }
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Аттрибутын утга">
                <Select
                  mode="multiple"
                  size={'small'}
                  placeholder="Please select"
                  style={{ width: '95%' }}
                >
                  { filter.attrvalue.map((i, key) => <Select.Option key={key}>{i}</Select.Option>) }
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="Бренд">
                <Select
                  mode="multiple"
                  size={'small'}
                  placeholder="Please select"
                  style={{ width: '95%' }}
                >
                  { filter.brandid.map((i, key) => <Select.Option key={key}>{i.name}</Select.Option>) }
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Шинэ бараа эсэх">
                <Select
                  size={'small'}
                  placeholder="Please select"
                  style={{ width: '95%' }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="Хямдралтай эсэх" className={style.formItem}>
                <Input size={'small'} placeholder="Хямдралтай эсэх" style={{ width: '95%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Онлайн төлөв">
                <Select
                  mode="multiple"
                  size={'small'}
                  placeholder="Please select"
                  style={{ width: '95%' }}
                >
                  { filter.isenable.map((i, key) => <Select.Option key={key}>{i.name}</Select.Option>) }
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="Хямдрал">
                <Select
                  mode="multiple"
                  size={'small'}
                  placeholder="Please select"
                  style={{ width: '95%' }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Мэдээлэл шинэчлэлт">
                <Select
                  size={'small'}
                  placeholder="Please select"
                  style={{ width: '95%' }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="Үнийн өөрчлөлт орсон бараа">
                <Select
                  mode="multiple"
                  size={'small'}
                  placeholder="Please select"
                  style={{ width: '95%' }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Зассан хэрэглэгч">
                <Select
                  mode="multiple"
                  size={'small'}
                  placeholder="Please select"
                  style={{ width: '95%' }}
                />
              </Form.Item>
            </Col>
          </Row>
          <div className="ant-modal-footer" style={{ marginBottom: 15 }}>
            <Button size="small" type="button" >{'Цэвэрлэх'}</Button>
            <Button size="small" htmlType="submit" loading={this.props.dataIsLoading} type="primary">{'Хайх'}</Button>
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
        pagination={{ defaultPageSize: 15 }}
        footer={this.renderFooter}
        onRow={record => ({
          onClick: () => this.handleRowClick(record),
        })}
      />
    </div>
  )

  render() {
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
