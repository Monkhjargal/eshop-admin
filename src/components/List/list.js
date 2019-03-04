import React, { Component } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { Card, Button, Popconfirm, Switch, message } from 'antd';
import { StandardTable, ModalForm, Form } from '../../components';


import styles from './style.less';

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      selectedId: null,
      body: {
        limit: 20000,
        page: 1,
        filtered: {},
        sorted: [],
      },
    };
  }

  componentDidMount() {
    this.refresh();
  }

  componentWillReceiveProps(nextProps) {
  }

  handleTableChange = ({ current, pageSize }, filters, sorter) => {
    this.setState({
      body: {
        ...this.state.body,
        page: current,
        limit: pageSize,
        // sorted: [{
        //   id: sorter.field,
        //   desc: sorter.order !== 'ascend',
        // }],
        sorted: sorter.field,
        desc: sorter.order !== 'ascend',
      },
    }, () => this.refresh());
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
    // console.log(data.formData);
    this.setState({
      body: {
        ...this.state.body,
        filtered: data.formData,
        // ...data.formData,
        // test: data.formData,
        // ...this.state.body,
        // page: 1,
      },
    }, () => this.refresh());
  }

  deleteData = () => {
    if (this.state.selectedId) {
      let requestObject = { _id: this.state.selectedId };
      if (this.props.url) {
        requestObject = { ...requestObject, url: this.props.url };
        // console.log(requestObject);
      }
      this.props.deleteData(requestObject).then(() => {
        console.log(this.state);
        this.refresh();
      });
    }
  }

  render() {
    if (this.props.headers) {
      this.props.headers.forEach((entry, index) => {
        const picserver = 'http://202.55.180.200:8877/';
        switch (entry.dataIndex) {
          case 'aid':
            return entry.render = (text, record, index) => <span>{index + 1}</span>;
          case 'isusefilter':
            return entry.render = (text, record) => <Switch checked={Boolean(record.isusefilter)} disabled />;
          case 'isnew':
            return entry.render = (text, record) => <Switch checked={Boolean(record.isnew)} disabled />;
          case 'insymd':
            return entry.render = (text, record) => <span>{record.insymd ? (<Moment format="YYYY-MM-DD">{record.insymd}</Moment>) : ''}</span>;
          case 'attributes':
            return entry.render = (text, record) => { console.log(record); };
          case 'updymd':
            return entry.render = (text, record) => <span>{record.updymd ? (<Moment format="YYYY-MM-DD">{record.updymd}</Moment>) : ''}</span>;
          case 'sdate':
            return entry.render = (text, record) => <span><Moment format="YYYY-MM-DD">{record.sdate}</Moment></span>;
          case 'edate':
            return entry.render = (text, record) => <span><Moment format="YYYY-MM-DD">{record.edate}</Moment></span>;
          case 'isenable':
            return entry.render = (text, record) => <Switch checked={Boolean(record.isenable)} disabled />;
          case 'isemart':
            return entry.render = (text, record) => <Switch checked={record.isemart} disabled />;
          case 'isshownm':
            return entry.render = (text, record) => <Switch checked={record.isshownm} disabled />;
          case 'colorcd':
            return entry.render = col => (
              <div>
                <span
                  style={{
                    display: 'block',
                    backgroundColor: `${col}`,
                    width: '50px',
                    height: '10px',
                    marginRight: '20px',
                  }}
                />
                <span>{col}</span>
              </div>);
          case 'color':
            return entry.render = col => (
              <div>
                <span
                  style={{
                    display: 'block',
                    backgroundColor: `${col}`,
                    width: '50px',
                    height: '10px',
                    marginRight: '20px',
                  }}
                />
                <span>{col}</span>
              </div>);
          case 'imgnm':
            return entry.render = url => <img src={picserver + url} alt={url} height="20px" />;
          case 'imgnmtwo':
            return entry.render = url => <img src={picserver + url} alt={url} height="20px" />;
          default:
            return '---';
        }
      });
    }

    return (
      <Card bordered={false}>
        <div className={styles.tableList} style={{ overflow: 'hidden', overflowX: 'auto' }}>
          {this.props.filter &&
            <Form
              modelName={this.props.model}
              form={this.props.filterForm}
              fetchForm={this.props.fetchFilter}
              formIsLoading={this.props.filterIsLoading}
              clearButton
              submitButtonName={'Хайх'}
              submitAction={this.filterHandler}
            />
          }
          <br />
          <div className={styles.tableListOperator}>
            {this.props.actions.indexOf('create') !== -1 &&
              <Button
                onClick={() => this.showModal(`${this.props.model}Create`)}
                size="small"
                icon="plus"
                type="primary"
                className={`${styles.formbutton} ${styles.primary}`}
              >
                {`${this.props.name} бүртгэх`}
              </Button>
            }
            {this.props.actions.indexOf('update') !== -1 &&
              <Button
                onClick={() => this.showModal(`${this.props.model}Update`)}
                icon="edit"
                size="small"
                type="dashed"
                disabled={!this.state.selectedId}
                className={`${styles.formbutton} ${styles.update}`}
              >
                {`${this.props.name} засах`}
              </Button>
            }
            {this.props.actions.indexOf('delete') !== -1 &&
              <Popconfirm
                title="Та устгахдаа итгэлтэй байна уу?"
                onConfirm={e => this.deleteData(e)}
                okText="Тийм"
                cancelText="Үгүй"
              >
                <Button
                  className={`${styles.formbutton}, ${styles.delete}`}
                  icon="delete"
                  type="danger"
                  size="small"
                  disabled={!this.state.selectedId}
                >
                  {`${this.props.name} устгах`}
                </Button>
              </Popconfirm>

            }
            {this.props.addonsArray.map(entry => (
              <Button
                onClick={() => this.showModal(`${entry.model}AddOnUpdate`)}
                icon="edit"
                size="small"
                type="primary"
                key={entry.model}
                disabled={!this.state.selectedId}
              >
                {`${entry.name} засах`}
              </Button>
            ))}
            {this.customAddons && this.customAddons.map(entry => entry())}
          </div>
          <StandardTable
            bordered
            onSelect={this.handleOnSelect}
            onChange={this.handleTableChange}
            columns={this.props.headers}
            data={this.props.data}
            loading={this.props.isLoading}
            pagination={{
              total: this.props.total,
              current: this.state.body.page,
              pageSize: this.state.body.limit,
              showSizeChanger: false,
            }}
            scroll={{ x: this.props.scroll }}
          />
        </div>
        <ModalForm
          visible={this.state.visible === `${this.props.model}Create`}
          modelName={`${this.props.model}/post`}
          submitAction={this.props.createData}
          onCancel={this.handleCancel}
          afterSubmit={this.afterSubmit}
          fetchForm={this.props.fetchForm}
          createFormData={this.props.formcreateByServer}
          form={this.props.createForm}
          formIsLoading={this.props.formIsLoading}
          title={`${this.props.name} бүртгэх`}
          url={this.props.url}
          error={this.props.error}
          errorMessage={this.props.errorMessage}
        />
        <ModalForm
          visible={this.state.visible === `${this.props.model}Update`}
          modelName={`${this.props.model}/put`}
          submitAction={this.props.updateData}
          onCancel={this.handleCancel}
          afterSubmit={this.afterSubmit}
          fetchForm={this.props.fetchForm}
          form={this.props.updateForm}
          createFormData={this.props.formcreateByServer}
          formIsLoading={this.props.formIsLoading}
          fetchData={this.props.getData}
          dataParams={{ _id: this.state.selectedId }}
          dataIsLoading={this.props.dataIsLoading}
          data={this.props.currentData}
          title={`${this.props.name} засах`}
          url={this.props.url}
          error={this.props.error}
          errorMessage={this.props.errorMessage}
        />
        {this.props.addonsArray.map((entry, index) => (
          <ModalForm
            key={entry.model}
            visible={this.state.visible === `${entry.model}AddOnUpdate`}
            onCancel={this.handleCancel}
            form={entry.form}
            formIsLoading={this.props.formIsLoading}
            fetchForm={this.props.fetchForm}
            data={entry.data}
            afterSubmit={this.afterSubmit}
            dataParams={{ _id: this.state.selectedId }}
            dataIsLoading={entry.isLoading}
            fetchData={this.props[`addons${index}get`]}
            modelName={`${entry.model}/put`}
            submitAction={this.props[`addons${index}update`]}
            title={`${entry.name} засах`}
            url={this.props.url}
            error={entry.error}
            errorMessage={entry.errorMessage}
          />
        ))}
      </Card>
    );
  }
}

List.propTypes = {
  getAllData: PropTypes.func.isRequired,
  headers: PropTypes.array,
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  total: PropTypes.number,
  // end of list props

  model: PropTypes.string.isRequired,
  filter: PropTypes.bool,
  scroll: PropTypes.number,
  addonsArray: PropTypes.array,
  name: PropTypes.string,
  url: PropTypes.string,
  actions: PropTypes.array,
  // customAddons: PropTypes.array,
  // end of component props

  fetchForm: PropTypes.func.isRequired,
  formIsLoading: PropTypes.bool,
  // end of form props

  fetchFilter: PropTypes.func.isRequired,
  filterIsLoading: PropTypes.bool,
  filterForm: PropTypes.object,
  // end of filter props

  createData: PropTypes.func.isRequired,
  updateData: PropTypes.func.isRequired,
  deleteData: PropTypes.func.isRequired,
  createForm: PropTypes.object,
  updateForm: PropTypes.object,
  getData: PropTypes.func.isRequired,
  dataIsLoading: PropTypes.bool,
  currentData: PropTypes.object,
  // end of create update props

  error: PropTypes.bool,
  errorMessage: PropTypes.string,
};

List.defaultProps = {
  headers: [],
  data: [],
  isLoading: false,
  total: 0,
  // end of list props

  filter: false,
  scroll: undefined,
  addonsArray: [],
  name: '',
  url: undefined,
  actions: [],
  // customAddons: [],
  // end of component props

  formIsLoading: false,
  // end of form props

  filterIsLoading: false,
  filterForm: {},
  // end of filter props

  createForm: {},
  updateForm: {},
  dataIsLoading: false,
  currentData: {},

  error: false,
  errorMessage: '',
};

export default List;
