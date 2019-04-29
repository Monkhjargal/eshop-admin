/**
 * COMPONENT NAME:                                      PRODUCT LIST
 * CREATED BY:                                          **BATTSOGT BATGERELT**
 * CREARED DATED:                                       2019-03-12
 * DESCRIPTION:                                         PRODUCT LIST VIEW, PRODUCT DETAIL, PRODUCT CHANGE STATUS AND PRODUCT CHANGE STATUS HISTORY VIEW
 */

import React from 'react';
import { Card, Button, Table, Spin, Popconfirm, Switch, Form, Row, Col, Input, Select } from "antd";
import PageHeaderLayout from "../../layouts/PageHeaderLayout";

import styles from '../../components/List/style.less';
import tableStyle from "../../components/StandardTable/index.less";
import style from "./styles.less";
import { UpdateModal, CreateModal } from "./components";
import productSty from "../Product/styles.less";

class Package extends React.Component {
  state = {
    name: 'Багцын',
    selectedId: null,
    selectedRow: [],
    isupdate: false,
    iscreate: false,
    tloading: false,
  }

  componentWillMount() {
    this.refreshList();
  }

  refreshList = () => {
    this.setState({ tloading: true });
    this.props.refresh({ body: [] }).then(res => this.setState({ tloading: false }));
  }

  handleRowClick = (record) => {
    this.setState({ selectedRow: record });
  }

  handleRowClass = record => (record.id === this.state.selectedRow.id ? tableStyle.selected : '');

  renderFooter = () => (
    <div className={tableStyle.tableFooter}>
      <div className={tableStyle.footerInfo}>
        Нийт: {this.props.dataSource.data.length}
      </div>
    </div>
  );

  handleUpdateModal = () => { this.setState({ isupdate: !this.state.isupdate }); }
  handleCreateModal = () => { this.setState({ iscreate: !this.state.iscreate }); }

  handleDelete = () => {
    this.props.dataSource.delete({ id: this.state.selectedRow.id }).then(res => this.refreshList());
  }

  handleFilter = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ tloading: true });
        this.props.refresh({ body: values }).then(res => this.setState({ tloading: false }));
      }
    });
  }

  handleResetFilter = () => { this.props.form.resetFields(); }

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
                  {getFieldDecorator('packagenm', {
                    initialValue: "",
                    rules: [{
                      required: false,
                    }],
                  })(
                    <Input size={'small'} placeholder="Багцын нэрээр хайх" />,
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
                <Form.Item className={productSty.formItem} label="Багцад орсон бараа">
                  {getFieldDecorator('skucds', {
                    initialValue: [],
                    rules: [{ required: false }],
                  })(
                    <Select
                      mode="multiple"
                      size={'small'}
                      placeholder="Багцад орсон бараагаар хайх"
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
      return console.log('render filter');
    }
  }

  renderButton = () => (
    <div className={styles.tableListOperator}>
      <Button
        size="small"
        icon="plus"
        type="primary"
        className={`${styles.formbutton} ${styles.primary}`}
        onClick={this.handleCreateModal}
      >
        {`${this.state.name} бүртгэх`}
      </Button>
      <Button
        icon="edit"
        size="small"
        type="dashed"
        className={`${styles.formbutton} ${styles.update}`}
        onClick={this.handleUpdateModal}
        disabled={this.state.selectedRow.length === 0}
      >
        {`${this.state.name} дэлгэрэнгүй засах`}
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
  )

  renderTable = () => {
    try {
      const { tloading } = this.state;
      const { headers } = this.props.dataSource;
      headers.map((i) => {
        switch (i.dataIndex) {
          case 'packagenm':
            return (
              i.render = text => <span onClick={this.handleUpdateModal} style={{ color: '#1890FF' }}>{text}</span>,
              i.sorter = (a, b) => a.packagenm.localeCompare(b.packagenm),
              i.sortDirections = ['descend', 'ascend']
            );
          case "featuretxt":
            return (
              i.sorter = (a, b) => a.featuretxt.localeCompare(b.featuretxt),
              i.sortDirections = ['descend', 'ascend']
            );
          case 'isenable':
            return (
              i.render = (text, record) => <Switch checked={!!record.isenable} disabled />,
              i.sorter = (a, b) => a.isenable - b.isenable,
              i.sortDirections = ['descend', 'ascend']
            );
          case 'skucnt':
            return (
              i.sorter = (a, b) => a.skucnt - b.skucnt,
              i.sortDirections = ['descend', 'ascend']
            );
          case 'insemp':
            return (
              i.sorter = (a, b) => a.insemp - b.insemp,
              i.sortDirections = ['descend', 'ascend']
            );
          case 'insymd':
            return (
              i.sorter = (a, b) => a.insymd - b.insymd,
              i.sortDirections = ['descend', 'ascend']
            );
          case 'updemp':
            return (
              i.sorter = (a, b) => a.updemp - b.updemp,
              i.sortDirections = ['descend', 'ascend']
            );
          case 'updymd':
            return (
              i.sorter = (a, b) => a.updymd - b.updymd,
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
            loading={tloading}
            dataSource={this.props.dataSource.data}
            columns={this.props.dataSource.headers}
            size="small"
            bordered
            rowKey={record => record.id}
            pagination={{ defaultPageSize: 12, showSizeChanger: true, showQuickJumper: true }}
            footer={this.renderFooter}
            onRow={record => ({
              onClick: () => this.handleRowClick(record),
            })}
          />
        </div>
      );
    } catch (error) {
      return console.log('render table');
    }
  }

  renderCreate = () => {
    try {
      const { iscreate } = this.state;
      return (
        <CreateModal
          visible={iscreate}
          onCancel={this.handleCreateModal}
          getProduct={this.props.getProduct}
          product={this.props.dataSource.product}
          create={this.props.create}
          refresh={this.refreshList}
        />
      );
    } catch (error) {
      return console.log(error);
    }
  }

  renderUpdate = () => {
    try {
      const { isupdate, selectedRow } = this.state;
      return (
        <UpdateModal
          visible={isupdate}
          onCancel={this.handleUpdateModal}
          getProduct={this.props.getProduct}
          product={this.props.dataSource.product}
          updatePackage={this.props.updatePackage}
          refresh={this.refreshList}
          id={selectedRow.id}
          getDetail={this.props.getDetail}
          detail={this.props.dataSource.detail}
        />
      );
    } catch (error) {
      return console.log(error);
    }
  }

  render() {
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList} style={{ overflow: 'hidden', overflowX: 'auto' }}>
            {this.renderFilter()}
            {this.renderButton()}
            {this.renderTable()}
            {this.renderCreate()}
            {this.renderUpdate()}
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}

const Packagelist = Form.create({ name: 'package_list' })(Package);
export default Packagelist;
