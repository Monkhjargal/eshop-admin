import React from 'react';
import { Card, Button, Table, Spin, Form, Input, Col, Row, Select, Switch, Progress } from "antd";

import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import styles from '../../components/List/style.less';
import tableStyle from "./styles.less";
import { UpdateModal, StatusModal, Excel } from "./components";
import { SelectTreeWidget } from "../../components/Form/Widgets";

const formatter = new Intl.NumberFormat("en-US");

class Product extends React.Component {
  state = {
    name: 'Барааны',
    selectedRow: [],
    loading: false, // table loading
    mainLoading: true, // page main loading хуудас дуудагдах үед
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
      pageno: 1, // page number
      rowcnt: 50, // row count
    },
    isupdate: false,
    isstatus: false,
    dataSource: {},
    detail: {},
  }

  componentWillMount() {
    this.props.getDataSource({ body: {} }).then(res => this.setState({ mainLoading: false }));
  }

  refreshList = () => {
    this.setState({ loading: true });
    this.props.getDataSource({ body: {} }).then(res => this.setState({ loading: false }));
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
    this.setState({ loading: true });
    const { filtered } = this.state;
    this.props.getDataSource({ body: filtered }).then(res => this.setState({ loading: false }));
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
            <Form className={tableStyle.otform}>
              <Row>
                <Col span={6}>
                  <Form.Item label="Барааны нэр" className={tableStyle.formItem}>
                    <Input size={'small'} placeholder="Барааны нэр хайх" style={{ width: '96%' }} onChange={this.handleFilterInput} value={filtered.skunm} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Аттрибут" className={tableStyle.formItem}>
                    <Select
                      mode="multiple"
                      size={'small'}
                      placeholder="Аттрибут хайх"
                      style={{ width: '96%' }}
                      value={filtered.attributeids === undefined ? [] : filtered.attributeids}
                      filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                      onChange={(val) => { this.handleChange({ name: 'attributeids', value: val }); }}
                    >
                      { filter.attributeids.map(i => <Select.Option key={i.id}>{i.name}</Select.Option>) }
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Ангилал" className={tableStyle.formItem}>
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
                  <Form.Item label="Аттрибутын утга" className={tableStyle.formItem}>
                    <Select
                      mode="multiple"
                      size={'small'}
                      placeholder="Аттрибутын утга хайх"
                      style={{ width: '96%' }}
                      value={filtered.attrvalueids}
                      filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                      onChange={(val) => { this.handleChange({ name: 'attrvalueids', value: val }); }}
                    >
                      { filter.attrvalueids.map(i => <Select.Option key={i.id}>{i.name}</Select.Option>) }
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <Form.Item label="Бренд" className={tableStyle.formItem}>
                    <Select
                      mode="multiple"
                      size={'small'}
                      placeholder="Бренд хайх"
                      style={{ width: '96%' }}
                      filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                      value={filtered.brandids}
                      onChange={(val) => { this.handleChange({ name: 'brandids', value: val }); }}
                    >
                      { filter.brandids.map(i => <Select.Option key={i.id}>{i.name}</Select.Option>) }
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Шинэ бараа эсэх" className={tableStyle.formItem}>
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
                  <Form.Item label="Хямдралтай эсэх" className={tableStyle.formItem}>
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
                  <Form.Item label="Онлайн төлөв" className={tableStyle.formItem}>
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
                  <Form.Item label="Эвентийн нэр" className={tableStyle.formItem}>
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
                  <Form.Item label="Мэдээлэл шинэчлэлт" className={tableStyle.formItem}>
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
                  <Form.Item label="Яаралтай үнийн өөрчлөлт орсон эсэх" className={tableStyle.formItem}>
                    <Select
                      size={'small'}
                      placeholder="Яаралтай үнийн өөрчлөлт орсон эсэх"
                      style={{ width: '96%' }}
                      value={filtered.ispricechanged === 0 ? undefined : filtered.ispricechanged}
                      onChange={(val) => { this.handleChange({ name: 'ispricechanged', value: val }); }}
                    >
                      {filter.ispricechanged.map(i => <Select.Option key={i.id === '' ? 0 : i.id}>{i.name}</Select.Option>) }
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Зассан хэрэглэгч" className={tableStyle.formItem}>
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

  handleChangePageSize = (pageno, rowcnt) => {
    console.log('pageno, rowcnt: ', pageno, rowcnt);
  }

  renderTable = () => {
    try {
      const { loading } = this.state;
      const { headers } = this.state.dataSource;
      headers.map((i) => {
        switch (i.dataIndex) {
          case 'titlenm':
            return (
              i.render = text => <span className={tableStyle.left} onClick={this.handleName}><a style={{ color: '#1890ff' }}>{text}</a></span>,
              i.sorter = (a, b) => a.titlenm.localeCompare(b.titlenm),
              i.sortDirections = ['descend', 'ascend']
            );
          case 'cstatus':
            return (
              i.render = text => (text === 0 ? <Progress strokeColor="#fd5c63" type="circle" percent={25} width={25} style={{ display: 'flex', justifyContent: 'center' }} /> :
                text === 1 ? <Progress strokeColor="#ffc20e" type="circle" percent={50} width={25} style={{ display: 'flex', justifyContent: 'center' }} /> :
                  text === 2 ? <Progress type="circle" percent={75} width={25} style={{ display: 'flex', justifyContent: 'center' }} /> :
                    text === 3 ? <Progress type="circle" percent={100} width={25} style={{ display: 'flex', justifyContent: 'center' }} /> : <span>{text}</span>),
              i.sorter = (a, b) => a.cstatus - b.cstatus,
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
              i.render = text => <span className={tableStyle.right}>{text === 0 ? '' : formatter.format(text)}</span>,
              i.sorter = (a, b) => a.newprice - b.newprice,
              i.sortDirections = ['descend', 'ascend']
            );
          case 'sprice':
            return (
              i.render = text => <span className={tableStyle.right}>{text === 0 ? '' : formatter.format(text)}</span>,
              i.sorter = (a, b) => a.sprice - b.sprice,
              i.sortDirections = ['descend', 'ascend']
            );
          case 'spercent':
            return (
              i.render = text => <span className={tableStyle.center}>{text === 0 ? '' : `${text}%`}</span>,
              i.sorter = (a, b) => a.spercent - b.spercent,
              i.sortDirections = ['descend', 'ascend']
            );
          case 'status':
            return (
              i.render = (text, record) => <span><Input size={'small'} disabled value={record.statusnm} className={text === 1 ? tableStyle.statusOne : text === 2 ? tableStyle.statusTwo : tableStyle.statusThree} /></span>,
              i.sorter = (a, b) => a.status - b.status,
              i.sortDirections = ['descend', 'ascend']
            );
          case 'availableqty':
            return (
              i.render = text => <span className={tableStyle.center}>{text === 0 ? '' : `${text}`}</span>,
              i.sorter = (a, b) => a.availableqty - b.availableqty,
              i.sortDirections = ['descend', 'ascend']
            );
          case 'isnew':
            return i.render = (text, record) => <Switch size="small" checked={!!record.isnew} disabled />;
          case 'rate':
            return (
              i.render = text => <span className={tableStyle.center}>{text === 0 ? '' : `${text}`}</span>,
              i.sorter = (a, b) => a.rate - b.rate,
              i.sortDirections = ['descend', 'ascend']
            );

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
            loading={loading}
            bordered
            rowKey={record => record.id}
            pagination={{
              defaultPageSize: 50,
              showSizeChanger: true,
              showQuickJumper: true,
              pageSizeOptions: ['50', '100', '200'],
              onChange: this.handleChangePageSize,
            }}
            footer={this.renderFooter}
            onRow={record => ({
              onClick: () => this.handleRowClick(record),
              onDoubleClick: () => this.handleUpdateModal(),
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
      const { mainLoading } = this.state;

      if (this.state.dataSource !== this.props.dataSource) {
        this.setState({ dataSource: this.props.dataSource });
      }

      if (!mainLoading) {
        return (
          <PageHeaderLayout>
            <Card bordered={false}>
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
                  afterClose={this.handleSearch}
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
            </Card>
          </PageHeaderLayout>
        );
      }

      return (
        <div style={{ marginLeft: '49%', paddingTop: '15%', paddingBottom: '15%' }}><Spin /></div>
      );
    } catch (error) {
      return console.log(error);
    }
  }
}

export default Product;
