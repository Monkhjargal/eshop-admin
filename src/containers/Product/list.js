import React from 'react';
import { Card, Button, Table, Spin, Form, Input, Col, Row, Select, Switch } from "antd";
import Rate from 'react-stars';

import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import styles from '../../components/List/style.less';
import tableStyle from "../../components/StandardTable/index.less";
import style from "./styles.less";
import { UpdateModal, StatusModal, Excel } from "./components";
import { SelectTreeWidget } from "../../components/Form/Widgets";

const formatter = new Intl.NumberFormat("en-US");

class Product extends React.Component {
  state = {
    name: 'Барааны',
    selectedRow: [],
    checkedRow: [],
    filtered: {
      skunm: '',
      catids: null,
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
      catids: '',
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

  handleChangeCat = (e) => {
    const { filtered } = this.state;
    filtered.catids = e;
    this.setState(filtered);
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
                      value={filtered.attributeids === undefined ? '' : filtered.attributeids}
                      onChange={(val) => { this.handleChange({ name: 'attributeids', value: val }); }}
                    >
                      { filter.attributeids.map(i => <Select.Option key={i.id}>{i.name}</Select.Option>) }
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Ангилал" className={style.formItem}>
                    <div style={{ width: '96%' }} >
                      <SelectTreeWidget
                        value={filtered.catids}
                        schema={{ options: filter.catids }}
                        onChange={this.handleChangeCat}
                        placeholder="Ангилалаар хайх"
                      />
                    </div>
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
                  <Form.Item label="Эвентийн нэр" className={style.formItem}>
                    <Select
                      mode="multiple"
                      size={'small'}
                      placeholder="Эвентээр хайх"
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
      return '';
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

  handleName = (e) => { this.handleUpdateModal(); }

  renderTable = () => {
    try {
      const { headers } = this.state.dataSource;
      headers.map((i) => {
        switch (i.dataIndex) {
          case 'titlenm':
            return (
              i.render = text => <span onClick={this.handleName}><a style={{ color: '#1890ff' }}>{text}</a></span>,
              i.sorter = (a, b) => a.titlenm.localeCompare(b.titlenm),
              i.sortDirections = ['descend', 'ascend']
            );
          case 'catnm':
            return (
              i.sorter = (a, b) => (a.catnm == null ? "" : a.catnm).localeCompare(b.catnm === null ? "" : b.catnm),
              i.sortDirections = ['descend', 'ascend']
            );
          case 'brandnm':
            return (
              i.sorter = (a, b) => (a.brandnm == null ? "" : a.brandnm).localeCompare(b.brandnm === null ? "" : b.brandnm),
              i.sortDirections = ['descend', 'ascend']
            );
          case 'newprice':
            return (
              i.render = text => <span>{text === 0 ? '' : formatter.format(text)}</span>,
              i.sorter = (a, b) => a.newprice - b.newprice,
              i.sortDirections = ['descend', 'ascend']
            );
          case 'sprice':
            return (
              i.render = text => <span>{formatter.format(text)}</span>,
              i.sorter = (a, b) => a.sprice - b.sprice,
              i.sortDirections = ['descend', 'ascend']
            );
          case 'spercent':
            return (
              i.render = text => <span>{text === 0 ? '' : `${text}%`}</span>,
              i.sorter = (a, b) => a.spercent - b.spercent,
              i.sortDirections = ['descend', 'ascend']
            );
          case 'status':
            return (
              i.render = (text, record) => <span><Input disabled value={record.statusnm} className={text === 1 ? style.statusOne : text === 2 ? style.statusTwo : style.statusThree} /></span>,
              i.sorter = (a, b) => a.status - b.status,
              i.sortDirections = ['descend', 'ascend']
            );
          case 'availableqty':
            return (
              i.render = text => <span>{text === 0 ? '' : `${text}`}</span>,
              i.sorter = (a, b) => a.availableqty - b.availableqty,
              i.sortDirections = ['descend', 'ascend']
            );
          case 'isnew':
            return i.render = (text, record) => <Switch checked={!!record.isnew} disabled />;
          case 'rate':
            return (i.sorter = (a, b) => a.rate - b.rate);

          default:
            return '';
        }
      });
      return (
        <div className={tableStyle.standardTable}>
          <Table
            rowClassName={this.handleRowClass}
            dataSource={this.state.dataSource.data}
            columns={this.state.dataSource.headers}
            size="small"
            bordered={false}
            rowKey={record => record.id}
            pagination={{ defaultPageSize: 10, showSizeChanger: true, showQuickJumper: true }}
            footer={this.renderFooter}
            onRow={record => ({
              onClick: () => this.handleRowClick(record),
            })}
          />
        </div>
      );
    } catch (error) {
      return '';
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
                      statusHistory={this.props.dataSource.statushistory}
                      getDetail={this.props.getDetail}
                      updateProduct={this.props.updateProduct}
                      getAttribute={this.props.getAttribute}
                      attribute={this.props.dataSource.attribute} // attribute step 2
                      updateAttr={this.props.updateAttr}
                      product={this.props.dataSource.data} // product list
                      relational={this.props.dataSource.relational} // step-3 relational
                      getRelational={this.props.getRelational} // get getRelational={this.props.getRelational}
                      updateRelational={this.props.updateRelational}
                      getStatusHistory={this.props.getStatusHistory}
                      afterClose={this.props.afterClose}
                    />

                    {/** Baraanii tuluv oorchiloh modal */}
                    <StatusModal
                      visible={this.state.isstatus}
                      onCancel={this.handleStatusModal}
                      getStatusProduct={this.props.getStatusProduct}
                      product={this.props.dataSource.status}
                      changeProductStatus={this.props.changeProductStatus}
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
