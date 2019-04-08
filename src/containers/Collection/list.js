import React from 'react';
import { Card, Button, Table, Spin, Popconfirm, Switch } from "antd";
import PageHeaderLayout from "../../layouts/PageHeaderLayout";

import styles from '../../components/List/style.less';
import tableStyle from "../../components/StandardTable/index.less";
import style from "./styles.less";
import { UpdateModal, CreateModal } from "./components";

class Packagelist extends React.Component {
  state = {
    name: 'Багцын',
    selectedId: null,
    selectedRow: [],
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
    iscreate: false,
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

  renderEditButton = () => (
    <div className={styles.tableListOperator}>
      <Button
        // onClick={() => this.showModal(`${this.props.model}Create`)}
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
        disabled={!this.state.selectedRow}
      >
        {`${this.state.name} дэлгэрэнгүй засах`}
      </Button>
      <Popconfirm
        title="Та устгахдаа итгэлтэй байна уу?"
        // onConfirm={e => this.deleteData(e)}
        okText="Тийм"
        cancelText="Үгүй"
      >
        <Button
          className={`${styles.formbutton}, ${styles.delete}`}
          icon="delete"
          type="danger"
          size="small"
          disabled={!this.state.selectedRow}
        >
          {`${this.state.name} устгах`}
        </Button>
      </Popconfirm>
    </div>
  )

  renderTable = () => {
    try {
      const { headers } = this.props.dataSource;
      headers.map((i) => {
        switch (i.dataIndex) {
          case 'description':
            return i.render = (text, record) => <div style={{ height: '70px' }}>{record.description}</div>;
          case 'isenable':
            return i.render = (text, record) => <Switch checked={!!record.isenable} disabled />;
          default:
            return '';
        }
      });
      return (
        <div className={tableStyle.standardTable}>
          <Table
            rowClassName={this.handleRowClass}
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
      );
    } catch (error) {
      return console.log('Хүснэгт зурах үед алдаа гарлаа\n', error);
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
          <div>
            {
              this.props.dataSource.data === undefined ? <div style={{ marginLeft: '49%', paddingTop: '15%', paddingBottom: '15%' }}><Spin /></div> : (
                <div className={styles.tableList} style={{ overflow: 'hidden', overflowX: 'auto' }}>
                  {/* {this.renderFilterFields()} */}
                  {this.renderEditButton()}
                  {this.renderTable()}
                  {this.renderCreate()}
                </div>
              )
            }
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}

export default Packagelist;
