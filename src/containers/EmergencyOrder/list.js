/**
 * COMPONENT NAME:                                      ORDER LIST
 * CREATED BY:                                          **BATTSOGT BATGERELT**
 * CREARED DATED:                                       2019-04-19
 * DESCRIPTION:                                         ORDER LIST VIEW, ORDER DETAIL, ORDER CHANGE STATUS AND ORDER CHANGE STATUS HISTORY VIEW
 */

import React from "react";
import {
  Card,
  Form,
  Row,
  Col,
  Input,
  Select,
  Button,
  Table,
  DatePicker,
  Icon,
} from "antd";

import tableStyle from "./styles.less";
import styles from "../../components/List/style.less";
import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import productSty from "../Product/styles.less";
import { DetailModal } from "./component";

const formatter = new Intl.NumberFormat("en-US");

class Component extends React.Component {
  state = {
    name: "Захиалга",
    loading: false, // table loading
    floading: false, // filter loading button
    selectedRow: [], // selected table's row
    isdetail: false, // detail modal
  };
  componentWillMount() {
    this.refreshList();
  }

  refreshList = () => {
    this.setState({ loading: !this.state.loading });
    this.props.getAll({ body: {} }).then((res) => {
      this.setState({ loading: !this.state.loading });
    });
  };

  /**
   * RENDER FILTER FIELDS AND FILTER'S METHOD
   */
  handleResetFilter = () => {
    this.props.form.resetFields();
  };
  handleFilter = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ floading: !this.state.floading, loading: !this.state.loading });

        // moment format-ийг хөрвүүлж байгаа
        // eslint-disable-next-line no-unused-expressions
        values.osdate === null ? '' : values.osdate = values.osdate.format('YYYY-MM-DD');
        // eslint-disable-next-line no-unused-expressions
        values.oedate === null ? '' : values.oedate = values.oedate.format('YYYY-MM-DD');

        this.props.getAll({ body: values }).then((res) => {
          this.setState({ floading: !this.state.floading, loading: !this.state.loading });
        });
      }
    });
  };

  renderFilter = () => {
    try {
      const { getFieldDecorator } = this.props.form;
      const { floading } = this.state;
      const { filter } = this.props.dataSource;
      return (
        <Form className={productSty.otform} onSubmit={this.handleFilter}>
          <Row>
            <Col span={6}>
              <Form.Item
                className={productSty.formItem}
                label="Захиалга №"
                style={{ width: "96%" }}
              >
                {getFieldDecorator("ordernum", {
                  initialValue: "",
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<Input allowClear size={"small"} placeholder="Захиалга дугаараар хайх" />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                className={productSty.formItem}
                label="Утасны №"
                style={{ width: "96%" }}
              >
                {getFieldDecorator("phonenum", {
                  initialValue: "",
                  rules: [{ required: false }],
                })(
                  <Input allowClear size={"small"} placeholder="Утасны дугаараар хайх" />,
                )}
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item
                className={productSty.formItem}
                label="Огноо"
                style={{ width: "96%" }}
              >
                {getFieldDecorator("isorder", {
                  initialValue: 1,
                  rules: [{ required: false }],
                })(
                  <Select
                    allowClear
                    size={"small"}
                    placeholder="Захиалгын болон хүргэлтийн огноогоор хайх"
                  >
                    <Select.Option value={1}>Захиалга</Select.Option>
                    <Select.Option value={0}>Хүргэлт</Select.Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item className={productSty.formItem} label="Эхлэх огноо" style={{ width: '100%' }}>
                {getFieldDecorator("osdate", {
                  initialValue: null,
                  rules: [{ required: false }],
                })(<DatePicker allowClear size={"small"} style={{ width: '96%' }} />)}
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item className={productSty.formItem} label="Дуусах огноо" style={{ width: '100%' }}>
                {getFieldDecorator("oedate", {
                  initialValue: null,
                  rules: [{ required: false }],
                })(<DatePicker allowClear size={"small"} style={{ width: '96%' }} />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                className={productSty.formItem}
                label="Захиалгын төлөв"
                // style={{ width: "96%" }}
              >
                {getFieldDecorator("ostatus", {
                  initialValue: [],
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(
                  <Select
                    allowClear
                    mode="tags"
                    size={"small"}
                    style={{ width: '96%' }}
                    placeholder="Захиалгын төлвөөр хайх"
                  >
                    {filter !== undefined
                      ? filter.ostatus.map(i => (
                        <Select.Option key={i.id}>{i.name}</Select.Option>
                        ))
                      : ""}
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                className={productSty.formItem}
                label="Хүргэлт №"
                style={{ width: "96%" }}
              >
                {getFieldDecorator("trucknum", {
                  initialValue: "",
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(
                  <Input
                    allowClear
                    size={"small"}
                    placeholder="Хүргэлтийн дугаараар хайх"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                className={productSty.formItem}
                label="Төлбөрийн хэлбэр"
                style={{ width: "96%" }}
              >
                {getFieldDecorator("paymenttype", {
                  initialValue: [],
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(
                  <Select
                    allowClear
                    mode="tags"
                    size={"small"}
                    placeholder="Төлбөрийн хэлбэрээр хайх"
                  >
                    {filter !== undefined
                      ? filter.paymenttype.map(i => (
                        <Select.Option key={i.id}>{i.name}</Select.Option>
                        ))
                      : ""}
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                className={productSty.formItem}
                label="Хүргэлтийн төрөл"
                style={{ width: "96%" }}
              >
                {getFieldDecorator("deliverytype", {
                  initialValue: [],
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(
                  <Select
                    allowClear
                    mode="tags"
                    size={"small"}
                    placeholder="Хүргэлтийн төрлөөр хайх"
                  >
                    {filter !== undefined
                      ? filter.deliverytype.map(i => (
                        <Select.Option key={i.id}>{i.name}</Select.Option>
                        ))
                      : ""}
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                className={productSty.formItem}
                label="Хүргэлт дүүрэг"
                style={{ width: "96%" }}
              >
                {getFieldDecorator("deliverydistrict", {
                  initialValue: [],
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(
                  <Select
                    allowClear
                    mode="tags"
                    size={"small"}
                    placeholder="Хүргэлт дүүргээр хайх"
                  >
                    {filter !== undefined
                      ? filter.deliverydistrict.map(i => (
                        <Select.Option key={i.id}>{i.name}</Select.Option>
                        ))
                      : ""}
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item className={productSty.formItem} label="Хүргэлтийн хаяг">
                {getFieldDecorator("isUser", {
                  initialValue: null,
                  rules: [{ required: false }],
                })(<Input allowClear size={"small"} style={{ width: '96%' }} placeholder="Хүргэлтийн хаягаар хайх" />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item className={productSty.formItem} label="Худалдан авагчийн нэр">
                {getFieldDecorator("ss", {
                  initialValue: null,
                  rules: [{ required: false }],
                })(<Input allowClear size={"small"} style={{ width: '96%' }} placeholder="Худалдан авагчийн нэрээр хайх" />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item className={productSty.formItem} label="Хүргэлт хамтрагч">
                {getFieldDecorator("ss", {
                  initialValue: null,
                  rules: [{ required: false }],
                })(<Input allowClear size={"small"} style={{ width: '96%' }} placeholder="Хүргэлт хамтрагчаар хайх" />)}
              </Form.Item>
            </Col>
          </Row>
          <div className="ant-modal-footer">
            <Button size="small" type="button" onClick={this.handleResetFilter}>
              {"Цэвэрлэх"}
            </Button>
            <Button size="small" type="primary" loading={floading} htmlType="submit">
              {"Хайх"}
            </Button>
          </div>
        </Form>
      );
      // eslint-disable-next-line no-unreachable
    } catch (error) {
      return null;
    }
  };

  /**
   * RENDER UPDATE AND DELETE BUTTON AND METHODS
   */
  handleDetailModal = () => {
    this.setState({ isdetail: !this.state.isdetail });
  }
  renderButton = () => (
    <div className={tableStyle.parent}>
      <div className={`${tableStyle.column} ${tableStyle.code}`}>
        <Button className={tableStyle.InComplete}><Icon style={{ fontSize: 22, color: "#FFB200" }} type="exclamation-circle" />Нөөц дутуу: 2</Button>
        <Button type="dashed" className={tableStyle.Dans} ><Icon style={{ fontSize: 22, color: "#007cc3" }} type="credit-card" />Дансаар: 1</Button>
        <Button className={tableStyle.UnSuccess} ><Icon style={{ fontSize: 22, color: "#008200" }} type="car" />Амжилтгүй хүргэлт: 2</Button>
      </div>

      <div className={`${tableStyle.column} ${tableStyle.rigth}`}>
        <Button
          icon="edit"
          type="dashed"
          className={`${styles.formbutton} ${styles.update}`}
          onClick={this.handleDetailModal}
          disabled={this.state.selectedRow.length === 0}
        >
          {`${this.state.name} дэлгэрэнгүй`}
        </Button>
      </div>
    </div>
  );

  /**
   *  RENDER TABLE AND TABLE'S METHODS
   */
  handleRowClass = record => (record.id === this.state.selectedRow.id ? tableStyle.selected : "");

  renderFooter = () => (
    <div className={tableStyle.tableFooter}>
      <div className={tableStyle.footerInfo}>
        Нийт:{" "}
        {this.props.dataSource.data === undefined
          ? 0
          : this.props.dataSource.data.length}
      </div>
    </div>
  );

  handleRowClick = (record) => {
    this.setState({ selectedRow: record });
  };

  renderTable = () => {
    try {
      const { headers, data, filter } = this.props.dataSource;
      const { loading } = this.state;

      // eslint-disable-next-line no-unused-expressions
      headers === undefined && filter === undefined ? null :
        headers.map((i) => {
          switch (i.dataIndex) {
            case "aid":
              return (
                i.sorter = (a, b) => a.aid - b.aid,
                i.sortDirections = ['descend', 'ascend']
              );
            case "orderdate":
              return (
                i.render = text => <span>{text}</span>,
                i.sorter = (a, b) => a.orderdate.localeCompare(b.orderdate),
                i.sortDirections = ['descend', 'ascend']
              );
            case "orderamount":
              return (
                i.render = text => <span className={tableStyle.number} >{formatter.format(text)}</span>,
                i.sorter = (a, b) => a.orderamount - b.orderamount,
                i.sortDirections = ['descend', 'ascend']
              );
            case "payamount":
              return (
                i.render = text => <span className={tableStyle.number} >{formatter.format(text)}</span>,
                i.sorter = (a, b) => a.payamount - b.payamount,
                i.sortDirections = ['descend', 'ascend']
              );
            case "paidamount":
              return (
                i.render = text => <span className={tableStyle.number}>{formatter.format(text)}</span>,
                i.sorter = (a, b) => a.paidamount - b.paidamount,
                i.sortDirections = ['descend', 'ascend']
              );
            case "varianceamount":
              return (
                i.render = text => <span className={tableStyle.number} >{formatter.format(text)}</span>,
                i.sorter = (a, b) => a.varianceamount - b.varianceamount,
                i.sortDirections = ['descend', 'ascend']
              );
            case "ordernumber":
              return (
                i.render = text => <span className={tableStyle.text} onClick={this.handleDetailModal}>{text}</span>,
                i.sorter = (a, b) => a.ordernumber - b.ordernumber,
                i.sortDirections = ['descend', 'ascend']
              );
            case "totalquantity":
              return (
                i.render = text => <span className={tableStyle.text} >{text}</span>,
                i.sorter = (a, b) => a.totalquantity - b.totalquantity,
                i.sortDirections = ['descend', 'ascend']
              );
            case "paymenttypenm":
              return (
                i.sorter = (a, b) => a.paymenttypenm.localeCompare(b.paymenttypenm),
                i.sortDirections = ['descend', 'ascend']
              );
            case "paymentstatus":
              return (
                i.render = text => <span>{filter.length === 0 ? null : filter.paymentstatus.find(i => i.id === text).name}</span>,
                i.sorter = (a, b) => a.paymentstatus - b.paymentstatus,
                i.sortDirections = ['descend', 'ascend']
              );
            case "orderstatus":
              return (
                i.render = text => <span>{filter.length === 0 ? null : filter.ostatus.find(i => (i.id === text)) === undefined ? '' : filter.ostatus.find(i => (i.id === text)).name}</span>,
                i.sorter = (a, b) => a.orderstatus - b.orderstatus,
                i.sortDirections = ['descend', 'ascend']
              );
            case "phone":
              return (
                i.sorter = (a, b) => a.phone - b.phone,
                i.sortDirections = ['descend', 'ascend']
              );
            case "deliverytypenm":
              return (
                i.sorter = (a, b) => a.deliverytypenm.localeCompare(b.deliverytypenm),
                i.sortDirections = ['descend', 'ascend']
              );
            case "deliverydate":
              return (
                i.sorter = (a, b) => a.deliverydate - b.deliverydate,
                i.sortDirections = ['descend', 'ascend']
              );
            case "trucknumber":
              return (
                i.sorter = (a, b) => a.trucknumber - b.trucknumber,
                i.sortDirections = ['descend', 'ascend']
              );
            case "districtnm":
              return (
                i.sorter = (a, b) => a.districtnm.localeCompare(b.districtnm),
                i.sortDirections = ['descend', 'ascend']
              );
            case "deliveryamount":
              return (
                i.render = text => <span className={tableStyle.number}>{formatter.format(text)}</span>,
                i.sorter = (a, b) => a.deliveryamount - b.deliveryamount,
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
            loading={loading}
            dataSource={data}
            columns={headers}
            size="small"
            bordered
            rowKey={record => record.id}
            pagination={{
              defaultPageSize: 50,
              showSizeChanger: true,
              showQuickJumper: true,
              pageSizeOptions: ['50', '100', '200'],
            }}
            footer={this.renderFooter}
            onRow={record => ({
              onClick: () => this.handleRowClick(record),
            })}
          />
        </div>
      );
      // eslint-disable-next-line no-unreachable
    } catch (error) {
      return console.log(error);
    }
  };

  renderDetailModal = () => {
    try {
      const { isdetail, selectedRow } = this.state;
      return (
        <DetailModal
          row={selectedRow}
          visible={isdetail}
          onCancel={this.handleDetailModal}
          refresh={this.refreshList}
          {...this.props}
        />
      );
    // eslint-disable-next-line no-unreachable
    } catch (error) {
      return error;
    }
  }

  render() {
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          {this.renderFilter()}
          {this.renderButton()}
          {this.renderTable()}
          {this.renderDetailModal()}
        </Card>
      </PageHeaderLayout>
    );
  }
}

export default Form.create({ name: "order" })(Component);
