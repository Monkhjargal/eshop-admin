import React from 'react';
import { Card, Button, Table, Spin, Switch, Popconfirm, Form, Col, Input, Row, Select } from "antd";

import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import styles from '../../components/List/style.less';
import tableStyle from "../../components/StandardTable/index.less";
import { CreateModal, UpdateModal } from "./components";
import productSty from "../Product/styles.less";

class Promotion extends React.Component {
  state = {
    name: 'Улирлын цэс',
    selectedRow: [],
    isupdate: false,
    iscreate: false,
    dataSource: {},
    tloading: false,
    istransfer: false,
  }

  handleRowClick = (record) => {
    this.setState({ selectedRow: record });
  }

  refreshList = () => {
    this.setState({ tloading: true });
    this.props.refresh().then(res => this.setState({ tloading: false }));
  }

  handleRowClass = record => (record.id === this.state.selectedRow.id ? tableStyle.selected : '');

  renderFooter = () => (
    <div className={tableStyle.tableFooter}>
      <div className={tableStyle.footerInfo}>
        Нийт: {this.props.dataSource.data === undefined ? 0 : this.props.dataSource.data.length}
      </div>
    </div>
  );

  handleCreateModal = () => { this.setState({ iscreate: !this.state.iscreate }); }
  handleUpdateModal = () => { this.setState({ isupdate: !this.state.isupdate }); }

  handleDelete = () => {
    this.props.delete({ id: this.state.selectedRow.id })
      .then((res) => {
        this.refreshList();
      });
  }

  handleResetFilter = () => { this.props.form.resetFields(); }

  handleFilter = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ tloading: true });
        this.props.refresh({ body: values }).then(res => this.setState({ tloading: false }));
      }
    });
  }

  renderFilter = () => {
    try {
      const { getFieldDecorator } = this.props.form;
      const { value } = this.props.dataSource.filter.data;

      return (
        <div>
          <Form className={productSty.otform} onSubmit={this.handleFilter} >
            <Row>
              <Col span={6}>
                <Form.Item className={productSty.formItem} label="Нэр" style={{ width: '96%' }}>
                  {getFieldDecorator('promotnm', {
                    initialValue: "",
                    rules: [{
                      required: false,
                    }],
                  })(
                    <Input size={'small'} placeholder="Улирлын цэсны нэрээр хайх" />,
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item className={productSty.formItem} label="Идэвхитэй эсэх" style={{ width: '96%' }}>
                  {getFieldDecorator('isenable', {
                    initialValue: [],
                    rules: [{ required: false }],
                  })(
                    <Select mode="multiple" size={'small'} placeholder="Идэвхитэй эсэхээр хайх">
                      {value !== undefined ? value.isenable.map(i => <Select.Option key={i.id}>{i.name}</Select.Option>) : '' }
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item className={productSty.formItem} label="Улирлын цэсэнд орсон бараа">
                  {getFieldDecorator('skucds', {
                    initialValue: [],
                    rules: [{ required: false }],
                  })(
                    <Select
                      mode="multiple"
                      size={'small'}
                      placeholder="Улирлын цэсэнд орсон бараагаар хайх"
                      filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                    >
                      {value !== undefined ? value.skucds.map(i => <Select.Option key={i.id}>{i.name}</Select.Option>) : '' }
                    </Select>,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <div className="ant-modal-footer">
              <Button size="small" type="button" onClick={this.handleResetFilter} >{'Цэвэрлэх'}</Button>
              <Button size="small" htmlType="submit" type="primary" >{'Хайх'}</Button>
            </div>
          </Form>
        </div>
      );
    // eslint-disable-next-line no-unreachable
    } catch (err) {
      return console.log(err);
    }
  }

  renderButtons = () => {
    try {
      return (
        <div className={styles.tableListOperator} style={{ marginTop: 20 }}>
          <Button
            icon="add"
            size="small"
            type="primary"
            onClick={this.handleCreateModal}
            className={`${styles.formbutton} ${styles.update}`}
          >
            {`${this.state.name} бүртгэх`}
          </Button>
          <Button
            icon="edit"
            size="small"
            type="dashed"
            onClick={this.handleUpdateModal}
            disabled={this.state.selectedRow.length === 0}
            className={`${styles.formbutton} ${styles.update}`}
          >
            {`${this.state.name} засах`}
          </Button>
          <Popconfirm
            title="Та устгахдаа итгэлтэй байна уу?"
            onConfirm={this.handleDelete}
            okText="Тийм"
            cancelText="Үгүй"
          >
            <Button
              className={`${styles.formbutton}, ${styles.delete}`}
              icon="delete"
              type="danger"
              size="small"
              disabled={this.state.selectedRow.length === 0}
            >
              {`${this.state.name} устгах`}
            </Button>
          </Popconfirm>
        </div>
      );
    } catch (err) {
      return console.log(err);
    }
  }

  renderTable = () => {
    try {
      const { headers, data } = this.state.dataSource;
      headers.map((i) => {
        switch (i.dataIndex) {
          case 'aid':
            return i.render = (text, record, index) => <span>{index + 1}</span>;
          case 'promotnm':
            return (
              i.render = text => <span onClick={this.handleUpdateModal}>{text}</span>,
              i.sorter = (a, b) => a.promotnm.localeCompare(b.promotnm),
              i.sortDirections = ['descend', 'ascend']
            );
          case 'isenable':
            return (
              i.render = (text, record) => <Switch checked={record.isenable} disabled />,
              i.sorter = (a, b) => a.isenable - b.isenable,
              i.sortDirections = ['descend', 'ascend']
            );
          case 'skucnt':
            return (
              i.sorter = (a, b) => a.skucnt - b.skucnt,
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
            dataSource={data}
            columns={headers}
            size="small"
            loading={this.state.tloading}
            bordered
            rowKey={record => record.id}
            pagination={{
              defaultPageSize: 50, showSizeChanger: true, showQuickJumper: true, pageSizeOptions: ['30', '50', '100', '200'],
            }}
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

  renderCreateModal = () => {
    try {
      const { iscreate, selectedRow } = this.state;
      return (
        <CreateModal
          visible={iscreate}
          onCancel={this.handleCreateModal}
          create={this.props.create}
          response={this.props.dataSource.createRes}
          refresh={this.refreshList}
          data={selectedRow}
          getProduct={this.props.getProduct}
          product={this.props.dataSource.product}
          updateProduct={this.props.updateProduct}
        />
      );
    } catch (err) {
      return console.log('Улирлын цэс бүртгэх үед алдаа гарлаа');
    }
  }

  renderUpdateModal = () => {
    try {
      const { isupdate, selectedRow } = this.state;
      return (
        <UpdateModal
          visible={isupdate}
          onCancel={this.handleUpdateModal}
          id={selectedRow.id}
          detail={this.props.dataSource.detail}
          refresh={this.refreshList}
          update={this.props.updateProduct}
          getProduct={this.props.getProduct}
          product={this.props.dataSource.product}
          getDetail={this.props.getDetail}
        />
      );
    } catch (err) {
      return console.log('Улирлын цэс засах үед алдаа гарлаа');
    }
  }

  render() {
    try {
      // console.log('PROMOTION LIST PROPS: ', this.props);
      if (this.state.dataSource !== this.props.dataSource) {
        this.setState({ dataSource: this.props.dataSource });
      }

      // dataSource is empty web loading mode
      if (Object.keys(this.props.dataSource).length !== 0) {
        return (
          <PageHeaderLayout>
            <Card bordered={false}>
              <div>
                <div className={styles.tableList} style={{ overflow: 'hidden', overflowX: 'auto' }}>
                  {this.renderFilter()}
                  {this.renderButtons()}
                  {this.renderTable()}
                  {this.renderCreateModal()}
                  {this.renderUpdateModal()}
                </div>
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

const PromotionList = Form.create({ name: 'promotion_list' })(Promotion);
export default PromotionList;
