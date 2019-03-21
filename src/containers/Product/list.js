import React from 'react';
import { Card, Button, Table, Spin, Form, Input, Col, Row, Select } from "antd";
import PageHeaderLayout from "../../layouts/PageHeaderLayout";

import styles from '../../components/List/style.less';
import tableStyle from "../../components/StandardTable/index.less";
// import formStyle from '../../components/Form/style.less';
import style from "./styles.less";
import { UpdateModal, StatusModal, Excel } from "./components";

class Product extends React.Component {
  state = {
    name: 'Барааны',
    selectedRow: [],
    checkedRow: [],
    filtered: {
      skunm: '',
      catids: [],
      attributeids: [],
      attrvalueids: [],
      brandids: [],
      isnewproduct: 0,
      isevnnormal: 0,
      evnnormalids: [],
      productstatus: [],
      isproductchanged: 0,
      ispricechanged: 0,
      updemps: [],
    },
    isupdate: false,
    isstatus: false,
    dataSource: {},
    detail: {},
  }

  handleRowClick = (record) => {
    this.setState({ selectedRow: record });
  }

  handleRowClass = record => (record.id === this.state.selectedRow.id ? tableStyle.selected : '');

  renderFooter = () => (
    <div className={tableStyle.tableFooter}>
      <div className={tableStyle.footerInfo}>
        Нийт: {this.props.dataSource.data === undefined ? 0 : this.props.dataSource.data.length}
      </div>
    </div>
  );

  handleUpdateModal = () => {
    this.setState({ isupdate: !this.state.isupdate });
    this.props.getDetail({ skucd: this.state.selectedRow.skucd });
  }
  handleStatusModal = () => { this.setState({ isstatus: !this.state.isstatus }); }

  handleFilterInput = (e) => {
    const { filtered } = this.state;
    filtered.skunm = e.target.value;
    this.setState(filtered);
  }

  handleChange = (e) => {
    const { filtered } = this.state;
    filtered[e.name] = e.value;
    this.setState(filtered);
  }

  handleSearch = () => {
    const { filtered } = this.state;
    this.props.getDataSource({ body: filtered });
  }

  handleClearFilter = () => {
    const clear = {
      skunm: '',
      catids: [],
      attributeids: [],
      attrvalueids: [],
      brandids: [],
      isnewproduct: 0,
      isevnnormal: 0,
      evnnormalids: [],
      productstatus: [],
      isproductchanged: 0,
      ispricechanged: 0,
      updemps: [],
    };
    this.setState({ filtered: clear });
  }

  renderFilterFields = () => {
    try {
      // console.log(this.props.dataSource.filter);
      const { filter } = this.props.dataSource;
      const { filtered } = this.state;

      return (
        <div>
          <div>
            <Form className={style.otform}>
              <Row>
                <Col span={6}>
                  <Form.Item label="Барааны нэр" className={style.formItem}>
                    <Input size={'small'} placeholder="Барааны нэр хайх" style={{ width: '96%' }} onChange={this.handleFilterInput} value={filtered.skunm} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Аттрибут" className={style.formItem}>
                    <Select
                      mode="multiple"
                      size={'small'}
                      placeholder="Аттрибут хайх"
                      style={{ width: '96%' }}
                      value={filtered.attributeids}
                      onChange={(val) => { this.handleChange({ name: 'attributeids', value: val }); }}
                    >
                      { filter.attributeids.map(i => <Select.Option key={i.id}>{i.name}</Select.Option>) }
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Ангилал" className={style.formItem}>
                    <Select
                      mode="multiple"
                      size={'small'}
                      placeholder="Ангилал хайх"
                      style={{ width: '96%' }}
                      value={filtered.catids}
                      onChange={(val) => { this.handleChange({ name: 'catids', value: val }); }}
                    >
                      { filter.catids.map(i => <Select.Option key={i.id}>{i.name}</Select.Option>) }
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Аттрибутын утга" className={style.formItem}>
                    <Select
                      mode="multiple"
                      size={'small'}
                      placeholder="Аттрибутын утга хайх"
                      style={{ width: '96%' }}
                      value={filtered.attrvalueids}
                      onChange={(val) => { this.handleChange({ name: 'attrvalueids', value: val }); }}
                    >
                      { filter.attrvalueids.map(i => <Select.Option key={i.id}>{i.name}</Select.Option>) }
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <Form.Item label="Бренд" className={style.formItem}>
                    <Select
                      mode="multiple"
                      size={'small'}
                      placeholder="Бренд хайх"
                      style={{ width: '96%' }}
                      value={filtered.brandids}
                      onChange={(val) => { this.handleChange({ name: 'brandids', value: val }); }}
                    >
                      { filter.brandids.map(i => <Select.Option key={i.id}>{i.name}</Select.Option>) }
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Шинэ бараа эсэх" className={style.formItem}>
                    <Select
                      size={'small'}
                      placeholder="Шинэ бараа эсэх хайх"
                      style={{ width: '96%' }}
                      value={filtered.isnewproduct === 0 ? undefined : filtered.isnewproduct}
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
                      value={filtered.isevnnormal === 0 ? undefined : filtered.isevnnormal}
                      onChange={(val) => { this.handleChange({ name: 'isevnnormal', value: val }); }}
                    >
                      { filter.isevnnormal.map(i => <Select.Option key={i.id === '' ? 0 : i.id}>{i.name}</Select.Option>) }
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Онлайн төлөв" className={style.formItem}>
                    <Select
                      mode="multiple"
                      size={'small'}
                      placeholder="Онлайн төлөв хайх"
                      style={{ width: '96%' }}
                      value={filtered.productstatus}
                      onChange={(val) => { this.handleChange({ name: 'productstatus', value: val }); }}
                    >
                      { filter.productstatus.map(i => <Select.Option key={i.id}>{i.name}</Select.Option>) }
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <Form.Item label="Хямдрал" className={style.formItem}>
                    <Select
                      mode="multiple"
                      size={'small'}
                      placeholder="Хямдрал хайх"
                      style={{ width: '96%' }}
                      value={filtered.evnnormalids}
                      onChange={(val) => { this.handleChange({ name: 'evnnormalids', value: val }); }}
                    >
                      {filter.evnnormalids.map(i => <Select.Option key={i.id}>{i.name}</Select.Option>) }
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Мэдээлэл шинэчлэлт" className={style.formItem}>
                    <Select
                      size={'small'}
                      placeholder="Мэдээлэл шинэчлэлт хайх"
                      style={{ width: '96%' }}
                      value={filtered.isproductchanged === 0 ? undefined : filtered.isproductchanged}
                      onChange={(val) => { this.handleChange({ name: 'isproductchanged', value: val }); }}
                    >
                      {filter.isproductchanged.map(i => <Select.Option key={i.id === '' ? 0 : i.id}>{i.name}</Select.Option>) }
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Үнийн өөрчлөлт орсон бараа" className={style.formItem}>
                    <Select
                      size={'small'}
                      placeholder="Үнийн өөрчлөлт орсон бараа хайх"
                      style={{ width: '96%' }}
                      value={filtered.ispricechanged === 0 ? undefined : filtered.ispricechanged}
                      onChange={(val) => { this.handleChange({ name: 'ispricechanged', value: val }); }}
                    >
                      {filter.ispricechanged.map(i => <Select.Option key={i.id === '' ? 0 : i.id}>{i.name}</Select.Option>) }
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Зассан хэрэглэгч" className={style.formItem}>
                    <Select
                      mode="multiple"
                      size={'small'}
                      placeholder="Зассан хэрэглэгч хайх"
                      style={{ width: '96%' }}
                      value={filtered.updemps}
                      onChange={(val) => { this.handleChange({ name: 'updemps', value: val }); }}
                    >
                      {filter.updemps.map(i => <Select.Option key={i.id}>{i.name}</Select.Option>) }
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <div className="ant-modal-footer" style={{ marginBottom: 15 }}>
                <Button size="small" type="button" onClick={this.handleClearFilter} >{'Цэвэрлэх'}</Button>
                <Button size="small" htmlType="submit" loading={this.props.dataIsLoading} type="primary" onClick={this.handleSearch} >{'Хайх'}</Button>
              </div>
            </Form>
          </div>
        </div>
      );
    } catch (error) {
      return console.log('хүснэгт зурах үед алдаа гарлаа\n', error);
    }
  }

  renderEditButton = () => {
    try {
      const { data, headers } = this.props.dataSource;
      return (
        <div className={styles.tableListOperator} style={{ marginTop: 20 }}>
          <Excel data={data} headers={headers} filename={'Барааны жагсаалт'} />
          <Button
            icon="edit"
            size="small"
            type="primary"
            onClick={this.handleStatusModal}
            className={`${styles.formbutton} ${styles.update}`}
          >
            {`${this.state.name} төлөв өөрчлөх`}
          </Button>

          <Button
            icon="edit"
            size="small"
            type="dashed"
            disabled={this.state.selectedRow.length === 0}
            className={`${styles.formbutton} ${styles.update}`}
            onClick={this.handleUpdateModal}
          >
            {`${this.state.name} дэлгэрэнгүй засах`}
          </Button>
        </div>
      );
    } catch (err) {
      return console.log(err);
    }
  }

  renderTable = () => {
    try {
      // console.log('rendering table product');
      return (
        <div className={tableStyle.standardTable}>
          <Table
            rowClassName={this.handleRowClass}
            dataSource={this.state.dataSource.data}
            columns={this.state.dataSource.headers}
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
      );
    } catch (error) {
      return console.log(error);
    }
  }

  render() {
    try {
      // console.log(this.props.dataSource);
      // const { filter } = this.props.filter[0] === undefined ? [] : this.props.filter[0];
      if (this.state.dataSource !== this.props.dataSource) {
        this.setState({ dataSource: this.props.dataSource });
      }
      return (
        <PageHeaderLayout>
          <Card bordered={false}>
            <div>
              {
                (!this.props.dataSource.data) ? <div style={{ marginLeft: '49%', paddingTop: '15%', paddingBottom: '15%' }}><Spin /></div> : (
                  <div className={styles.tableList} style={{ overflow: 'hidden', overflowX: 'auto' }}>
                    {this.renderFilterFields()}
                    {this.renderEditButton()}
                    {this.renderTable()}
                    <UpdateModal
                      visible={this.state.isupdate}
                      onCancel={this.handleUpdateModal}
                      dataSource={this.state.selectedRow} // selected roe step one data
                      filter={this.props.dataSource.filter}
                      detail={this.props.dataSource.detail}
                      updateProduct={this.props.updateProduct}
                      getAttribute={this.props.getAttribute}
                      attribute={this.props.dataSource.attribute} // attribute step 2
                      updateAttr={this.props.updateAttr}
                      product={this.props.dataSource.data} // product list
                    />
                    <StatusModal
                      visible={this.state.isstatus}
                      onCancel={this.handleStatusModal}
                    />
                  </div>
                )
              }
            </div>
          </Card>
        </PageHeaderLayout>
      );
    } catch (error) {
      return console.log(error);
    }
  }
}

export default Product;
