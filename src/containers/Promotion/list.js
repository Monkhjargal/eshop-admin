import React from 'react';
import { Card, Button, Table, Spin, Switch, Popconfirm } from "antd";

import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import styles from '../../components/List/style.less';
import tableStyle from "../../components/StandardTable/index.less";
import { CreateModal, UpdateModal } from "./components";

class Product extends React.Component {
  state = {
    name: 'Суртачилгааны ангилал',
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
  handleTransferModal = () => { this.setState({ istransfer: !this.state.istransfer }); }

  handleDelete = () => {
    this.props.delete({ id: this.state.selectedRow.id })
      .then((res) => {
        this.refreshList();
      });
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
            return i.render = text => <span onClick={this.handleTransferModal}>{text}</span>;
          case 'isenable':
            return i.render = (text, record) => <Switch checked={record.isenable} disabled />;

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
      return console.log('Суртачилгааны ангилал бүртгэх үед алдаа гарлаа');
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
      return console.log('Суртачилгааны ангилал засах үед алдаа гарлаа');
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

export default Product;
