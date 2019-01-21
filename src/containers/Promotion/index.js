import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Table, Switch, Card, Button, Popconfirm, Modal, Input, Form, Checkbox } from 'antd';
import { PromotionCol } from './columns';

import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import style from './style.less';

import { Promotion as PromotionModel } from "../../models";
import DataTransfer from './Transfer';


const mapStateToProps = (state, ownProps) => {
  // console.log('Promotion', state);
  const {
    promotion: {
      all: {
        data, isLoading, pages, total, formcreateByServer,
      },
      current: {
        data: currentData, isLoading: currentIsLoading, error, errorMessage,
      },
    },
    form: {
      forms: {
        'promotioncategory/post': createForm,
        'promotioncategory/put': updateForm,
      },
      isLoading: formIsLoading,
    },
  } = state;

  let returnObject = {
    data,
    isLoading,
    pages,
    formcreateByServer,
    total,
    currentData,
    currentIsLoading,
    createForm,
    updateForm,
    formIsLoading,
    error,
    errorMessage,
  };

  return returnObject;
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let actionCreators = {
    fetchForm: Form.get,
    getAllData: PromotionModel.all,
    getById: PromotionModel.get,
    createData: PromotionModel.create,
    deleteData: PromotionModel.delete,
    updateData: PromotionModel.update,
  };

  return ({
    ...bindActionCreators(actionCreators, dispatch),
  });
};

class Promotion extends Component {
  state = {
    selectedRow: {
      id: null,
      promotnm: null,
      skucnt: null,
      isenable: null,
      skucds: [],
    },
    createRow: {
      promotnm: null,
      isenable: null,
    },
    isCreateProm: false,
    isUpdateProm: false,
    isUpdateProduct: false,
    body: {
      limit: 20,
      page: 1,
      filtered: {},
      sorted: [],
    },
  };

  componentDidMount() { this.refresh(); }
  refresh = () => { this.props.getAllData({ body: this.state.body }); }
  selectedRowClear = () => { this.state.selectedRow = []; }
  createRowClear = () => { this.state.createRow = []; }

  handleRowClass = record => (record.id === this.state.selectedRow.id ? style.selected : '');
  handleRowClick = (record) => { this.setState({ selectedRow: record }); }
  handleRowDoubleClick = () => { this.addProduct(); }

  createPorm = () => {
    this.createRowClear();
    this.setState({ isCreateProm: !this.state.isCreateProm });
  }
  createPromotnmChng = (e) => {
    const { createRow } = this.state;
    createRow.promotnm = e.target.value;
    this.setState({ createRow });
  }
  createCheckboxChng = (e) => {
    const { createRow } = this.state;
    createRow.isenable = e.target.checked;
    this.setState({ createRow });
  }
  okCreatePromModal = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.createData({
          body: {
            promotnm: this.state.createRow.promotnm,
            isenable: this.state.createRow.isenable,
            skucds: [],
          },
        }).then(() => {
          this.createPorm();
          this.refresh();
        });
      }
    });
  }
  cancelCreatePromModal = () => { this.createPorm(); }

  updateProm = () => { this.setState({ isUpdateProm: !this.state.isUpdateProm }); }
  cancelUpdatePromModal = () => { this.updateProm(); }
  okUpdatePromModal = () => {
    this.props.updateData({
      body: {
        promotid: this.state.selectedRow.id,
        promotnm: this.state.selectedRow.promotnm,
        isenable: this.state.selectedRow.isenable,
        skucds: this.state.selectedRow.skucds,
      },
    }).then(() => {
      this.updateProm();
      this.refresh();
    });
  }
  updateCheckboxChng = (e) => {
    const { selectedRow } = this.state;
    selectedRow.isenable = e.target.checked;
    this.setState({ selectedRow });
  }
  updatePromotnmChng = (e) => {
    const { selectedRow } = this.state;
    selectedRow.promotnm = e.target.value;
    this.setState({ selectedRow });
  }

  deleteData = () => {
    this.props.deleteData({ _id: this.state.selectedRow.id }).then(() => {
      this.selectedRowClear();
      this.refresh();
    });
  }

  addProduct = () => {
    console.log(this.state.selectedRow);
    this.setState({ isUpdateProduct: !this.state.isUpdateProduct });
  }
  okAddProduct = () => {
    this.props.updateData({
      body: {
        promotid: this.state.selectedRow.id,
        promotnm: this.state.selectedRow.promotnm,
        isenable: this.state.selectedRow.isenable,
        skucds: this.state.selectedRow.skucds,
      },
    }).then(() => {
      this.addProduct();
      this.selectedRowClear();
      this.refresh();
    });
  }
  cancelAddProduct = () => { this.addProduct(); }
  selectedProductChange = (selectedProduct) => {
    const { selectedRow } = this.state;
    selectedRow.skucds = selectedProduct;
    this.setState({ selectedRow });
  }
  render() {
    const { data } = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 8 },
    };
    PromotionCol.forEach((entry, index) => {
      if (entry.dataIndex === 'isenable' || entry.dataIndex === 'isemart') {
        entry.render = isenable => <div>{ isenable ? <Switch defaultChecked disabled /> : <Switch disabled /> }</div>;
      }
    });
    const { getFieldDecorator } = this.props.form;
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={style.tableListOperator}>
            <Button
              icon="plus"
              type="primary"
              size="large"
              onClick={this.createPorm}
            > {'Promotion бүртгэх'}
            </Button>{' '}
            <Button
              icon="edit"
              type="primary"
              size="large"
              disabled={!this.state.selectedRow.id}
              onClick={this.updateProm}
            > {'Promotion засах'}
            </Button>{' '}
            <Popconfirm
              title="Та устгахдаа итгэлтэй байна уу?"
              onConfirm={e => this.deleteData(e)}
              okText="Тийм"
              cancelText="Үгүй"
            >
              <Button
                icon="delete"
                type="danger"
                size="large"
                disabled={!this.state.selectedRow.id}
              > {'Promotion устгах'}
              </Button> {' '}
            </Popconfirm>
            <Button
              className={style.formbutton}
              icon="plus"
              type="primary"
              size="large"
              disabled={!this.state.selectedRow.id}
              onClick={this.addProduct}
            > {'Бараа засах'}
            </Button>{' '}
          </div> <br />
          <div className={style.Table}>
            <Table
              bordered
              rowClassName={this.handleRowClass}
              dataSource={data}
              columns={PromotionCol}
              onRow={record => ({
                onClick: () => this.handleRowClick(record),
                onDoubleClick: () => this.handleRowDoubleClick(record),
              })}
            />
          </div>
        </Card>

        <Modal
          title="Суртачилгаа бүртгэх"
          visible={this.state.isCreateProm}
          onOk={this.okCreatePromModal}
          onCancel={this.cancelCreatePromModal}
          okText="Бүртгэх"
          cancelText="Болих"
          centered
          width={800}
        >
          <Form>
            <Form.Item
              {...formItemLayout}
              label="Суртачилгааны ангилал: "
            >
              {getFieldDecorator('PromotionCategory', {
                rules: [{ required: true, message: 'This field should not be left blank.' }],
                })(
                  <Input value={this.state.createRow.promotnm} onChange={this.createPromotnmChng} />,
              )}

            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Идэвхитэй эсэх: "
              required
            >
              <Checkbox value={this.state.createRow.isenable} onChange={this.createCheckboxChng} />
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Суртачилгаа засах"
          visible={this.state.isUpdateProm}
          onOk={this.okUpdatePromModal}
          onCancel={this.cancelUpdatePromModal}
          okText="Засах"
          cancelText="Буцах"
          centered
          width={800}
        >
          <Form>
            <Form.Item
              {...formItemLayout}
              label="Суртачилгааны ангилал: "
              required
            >
              <Input value={this.state.selectedRow.promotnm} onChange={this.updatePromotnmChng} />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Идэвхитэй эсэх: "
              required
            >
              <Checkbox checked={this.state.selectedRow.isenable} onChange={this.updateCheckboxChng} />
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Бараа засах"
          visible={this.state.isUpdateProduct}
          onOk={this.okAddProduct}
          onCancel={this.cancelAddProduct}
          okText="Засах"
          cancelText="Буцах"
          centered
          width={800}
        >
          <DataTransfer selectedProduct={this.state.selectedRow.skucds} onChange={this.selectedProductChange} />
        </Modal>
      </PageHeaderLayout>
    );
  }
}
Promotion.default = {
  url: undefined,
};

Promotion.propTypes = {
  url: PropTypes.string.isRequired,
};
const PromotionForm = Form.create({ name: 'Promotion' })(Promotion);
export default connect(mapStateToProps, mapDispatchToProps)(PromotionForm);
