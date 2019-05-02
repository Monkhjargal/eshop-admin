import React from 'react';
import { Card, Spin, Form, Row, Col, Input, Select, Button, Popconfirm, Table, Switch } from "antd";

import styles from '../../components/List/style.less';
import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import productSty from "../Product/styles.less";
import tableStyle from "../../components/StandardTable/index.less";
import { CreateModal, UpdateModal } from "./component";

const picserver = 'http://202.55.180.199:8877/';

class Recipe extends React.Component {
  state = {
    name: 'Жор',
    selectedRow: [],
    tloading: true,
    iscreate: false,
    isupdate: false,
  }

  componentWillMount() { this.refreshList(); }

  refreshList = () => {
    this.setState({ tloading: true });
    this.props.getAll({ body: {} }).then(res => this.setState({ tloading: false }));
  }

  handleResetFilter = () => { this.props.form.resetFields(); }

  handleFilter = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('handleFilter values of form: ', values);
        this.setState({ tloading: !this.state.tloading });
        this.props.getAll({ body: values }).then(res => this.setState({ tloading: !this.state.tloading }));
      }
    });
  }

  renderFilter = () => {
    try {
      const { getFieldDecorator } = this.props.form;
      const { data } = this.props.dataSource.filter;

      return (
        <div>
          <Form className={productSty.otform} onSubmit={this.handleFilter}>
            <Row>
              <Col span={6}>
                <Form.Item className={productSty.formItem} label="Жорын нэр" style={{ width: '96%' }}>
                  {getFieldDecorator('recipenm', {
                    initialValue: "",
                    rules: [{
                      required: false,
                    }],
                  })(
                    <Input size={'small'} placeholder="Жорын нэрээр хайх" />,
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item className={productSty.formItem} label="Орц" style={{ width: '96%' }}>
                  {getFieldDecorator('ingredient', {
                    initialValue: [],
                    rules: [{
                      required: false,
                    }],
                  })(
                    <Select
                      mode="multiple"
                      size={'small'}
                      placeholder="Жоронд орсон орцоор хайх"
                      // filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                    >
                      {data !== undefined ? data.ingredient.map(i => <Select.Option key={i.id}>{i.name}</Select.Option>) : '' }
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item className={productSty.formItem} label="Жоронд орсон бараа">
                  {getFieldDecorator('skucds', {
                    initialValue: [],
                    rules: [{ required: false }],
                  })(
                    <Select
                      mode="multiple"
                      size={'small'}
                      placeholder="Жоронд орсон бараагаар хайх"
                      filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                    >
                      {data !== undefined ? data.skucds.map(i => <Select.Option key={i.id}>{i.name}</Select.Option>) : '' }
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item className={productSty.formItem} label="Амтлагч" style={{ width: '96%' }}>
                  {getFieldDecorator('spice', {
                    initialValue: [],
                    rules: [{
                      required: false,
                    }],
                  })(
                    <Select
                      mode="multiple"
                      size={'small'}
                      placeholder="Жоронд орсон амтлагчаар хайх"
                      filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                    >
                      {data !== undefined ? data.spice.map(i => <Select.Option key={i.id}>{i.name}</Select.Option>) : '' }
                    </Select>,
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
                      {data !== undefined ? data.isenable.map(i => <Select.Option key={i.id}>{i.name}</Select.Option>) : '' }
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
      return null;
    }
  }

  handleCreateModal = () => { this.setState({ iscreate: !this.state.iscreate }); }

  handleUpdateModal = () => { this.setState({ isupdate: !this.state.isupdate }); }

  handleDelete = () => {
    this.props.delete({ id: this.state.selectedRow.id })
      .then((res) => {
        this.setState({ selectedRow: [] });
        this.refreshList();
      });
  }

  renderButton = () => (
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

  handleRowClick = (record) => { this.setState({ selectedRow: record }); }
  handleRowClass = record => (record.id === this.state.selectedRow.id ? tableStyle.selected : '');

  renderTable = () => {
    try {
      const { tloading } = this.state;
      const { headers } = this.props.dataSource;

      headers.map((i) => {
        switch (i.dataIndex) {
          case 'recipenm':
            return (
              i.render = text => <span onClick={this.handleUpdateModal}>{text}</span>,
              i.sorter = (a, b) => a.recipenm.localeCompare(b.recipenm),
              i.sortDirections = ['descend', 'ascend']
            );
          case 'imgnm':
            return (
              i.render = img => (<div
                style={{
                  background: `url(${picserver + img})`,
                  width: '100px',
                  height: '40px',
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              />)
            );
          case "madeoflvl":
            return (
              i.sorter = (a, b) => a.madeoflvl - b.madeoflvl,
              i.sortDirections = ['descend', 'ascend']
            );
          case "time":
            return (
              i.sorter = (a, b) => a.time - b.time,
              i.sortDirections = ['descend', 'ascend']
            );
          case "humancnt":
            return (
              i.sorter = (a, b) => a.humancnt - b.humancnt,
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
            pagination={{
              defaultPageSize: 50, showSizeChanger: true, showQuickJumper: true, pageSizeOptions: ['50', '100', '200'],
            }}
            footer={this.renderFooter}
            onRow={record => ({
              onClick: () => this.handleRowClick(record),
            })}
          />
        </div>
      );
    } catch (err) {
      return null;
    }
  }

  renderCreate = () => {
    try {
      const { iscreate } = this.state;
      return (
        <CreateModal
          selectOption={this.props.dataSource.filter}
          visible={iscreate}
          onCancel={this.handleCreateModal}
          getProduct={this.props.getProduct}
          product={this.props.dataSource.product}
          create={this.props.create}
          refresh={this.refreshList}
          createStepOne={this.props.createStepOne}
          crecipe={this.props.dataSource.crecipe}
          getStepTwo={this.props.getStepTwo}
          stepTwoData={this.props.dataSource.stepTwoData}
          createStepTwo={this.props.createStepTwo}
          updateProduct={this.props.updateProduct}
        />
      );
    } catch (err) {
      return console.log(err);
    }
  }

  renderUpdate = () => {
    try {
      const { isupdate } = this.state;
      return (
        <UpdateModal
          selectOption={this.props.dataSource.filter}
          visible={isupdate}
          onCancel={this.handleUpdateModal}
          getProduct={this.props.getProduct}
          product={this.props.dataSource.product}
          create={this.props.create}
          refresh={this.refreshList}
          crecipe={this.props.dataSource.crecipe}
          getStepTwo={this.props.getStepTwo}
          stepTwoData={this.props.dataSource.stepTwoData}
          createStepTwo={this.props.createStepTwo}
          getStepOne={this.props.getStepOne}
          stepOneDetail={this.props.dataSource.stepOne}
          selectedRow={this.state.selectedRow}
          updateStepOne={this.props.updateStepOne}
          updateProduct={this.props.updateProduct}
        />
      );
    } catch (error) {
      return console.log('RECIPE UPDATE MODAL: \n', error);
    }
  }

  render() {
    // console.log("RECIPE LIST PROPS: ", this.props);
    // console.log("RECIPE LIST STATE: ", this.state.iscreate);

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

const RecipeList = Form.create({ name: 'recipe_list' })(Recipe);
export default RecipeList;
