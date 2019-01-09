import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { Card, Button, Table, Popconfirm } from "antd";

import { Ehow as EhowModel, Form } from "../../models";
import { ModalForm, StandardTable } from '../../components';

const mapStateToProps = (state) => {
  const { ehow } = state;
  return {
    ehow,
  };
};

const mapDispatchToProps = {
  getEhow: EhowModel.ehowList,
};

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    defaultSortOrder: ["ascend"],
    sorter: (a, b) => a > b,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Жорын нэр",
    dataIndex: "recipenm",
    defaultSortOrder: "ascend",
    sorter: (a, b) => a.recipenm.length - b.recipenm.length,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Тайлбар",
    dataIndex: "description",
    defaultSortOrder: "ascend",
    sorter: (a, b) => a.description.length - b.description.length,
    sortDirections: ["descend", "ascend"],
  },
];

class EhowList extends Component {
  static propTypes = {
    getEhow: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      ehow: [],
      visible: false,
      selectedId: null,
      isenable: false,
      body: {
        limit: 20,
        page: 1,
        filtered: {},
        sorted: [],
      },
    };
  }

  async componentDidMount() {
    await this.props.getEhow();
    this.setState({
      ehow: this.props.ehow.data,
    });
  }

  showModal = (modal) => {
    this.setState({
      visible: modal,
    });
  }

  handleCancel = (callback) => {
    const cb = typeof callback === 'function' ? callback : null;
    this.setState({
      visible: true,
    }, cb);
  }

  handleOnSelect = (selectedId) => {
    this.setState({
      selectedId,
    });
  }

  afterSubmit = () => {
    this.handleCancel(() => {
      this.refresh();
    });
  }

  refresh = () => {
    this.props.getAllData({ body: this.state.body, url: this.props.url });
  }

  filterHandler = (data) => {
    this.setState({
      body: {
        ...this.state.body,
        page: 1,
        filtered: data.formData,
      },
    }, () => this.refresh());
  }

  deleteData = () => {
    if (this.state.selectedId) {
      let requestObject = { _id: this.state.selectedId };
      if (this.props.url) {
        requestObject = { ...requestObject, url: this.props.url };
      }
      this.props.deleteData(requestObject).then(() => {
        this.refresh();
      });
    }
  }

  render() {
    return (
      <Card bordered={false}>
        <div style={{ overflow: 'hidden', overflowX: 'auto' }}>
          <Button
            onClick={() => this.showModal('EhowCreate')}
            size="small"
            icon="plus"
            type="primary"
          >
            {'Жор бүртгэх'}
          </Button>
          {this.state.selectedId &&
            <Button
              onClick={() => this.showModal('EhowUpdate')}
              icon="edit"
              size="small"
              type="primary"
              disabled={!this.state.selectedId}
            >
              {'Жор засах'}
            </Button>
          }
          {/* {this.props.actions.indexOf('delete') !== -1 &&
            <Popconfirm
              title="Та устгахдаа итгэлтэй байна уу?"
              onConfirm={e => this.deleteData(e)}
              okText="Тийм"
              cancelText="Үгүй"
            >
              <Button
                icon="delete"
                type="danger"
                size="small"
                disabled={!this.state.selectedId}
              >
                {'Жор устгах'}
              </Button>
            </Popconfirm>
          } */}

          {/* <StandardTable
            bordered
            onSelect={this.handleOnSelect}
            onChange={this.handleTableChange}
            columns={columns}
            data={this.state.ehow.value}
            loading={this.props.isLoading}
            pagination={{
              total: this.props.total,
              current: this.state.body.page,
              pageSize: this.state.body.limit,
              showSizeChanger: true,
            }}
            scroll={{ x: this.props.scroll }}
          /> */}

          <Table
            columns={columns}
            dataSource={this.state.ehow.value}
            onChange={this.onChange}
          />
          ,
        </div>
        <ModalForm
          visible={this.state.visible === 'EhowCreate'}
          modelName={'Ehow/post'}
          submitAction={'Ehow.create'}
          onCancel={this.handleCancel}
          afterSubmit={this.afterSubmit}
          fetchForm={Form.get}
          // createFormData={this.props.formcreateByServer}
          form={this.props.createForm}
          // formIsLoading={this.props.formIsLoading}
          title={'Жор бүртгэх'}
          // url={this.props.url}
          // error={this.props.error}
          // errorMessage={this.props.errorMessage}
        />
      </Card>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EhowList);
