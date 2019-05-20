/**
 * COMPONENT NAME:                                      ORDER DETAIL
 * CREATED BY:                                          **BATTSOGT BATGERELT**
 * CREARED DATED:                                       2019-04-19
 * DESCRIPTION:                                         ORDER DETAIL, CHANGE AMOUNT, STATUS CHANGE HISTORY
 */

import React from "react";
import { Modal, Collapse, Spin, Col, Input, Form, Table, Icon, Tooltip, Button } from "antd";

import {
  AmountHistoryModal, AddAmountModal, ChangeStatusHistory,
  DeliveryTypeHistory,
} from '../';
import styles from "../../styles.less";

const formatter = new Intl.NumberFormat("en-US");

// хүснэгтийн багана
const columns = [{
  title: 'Барааны код',
  dataIndex: 'skucd',
  key: 'skucd',
}, {
  title: 'Барааны нэр',
  dataIndex: 'skunm',
  key: 'skunm',
}, {
  title: 'Тоо хэмжээ',
  dataIndex: 'quantity',
  key: 'quantity',
  render: text => <span className={styles.center}>{formatter.format(text)}</span>,
}, {
  title: 'Худалдах үнэ',
  dataIndex: 'newprice',
  key: 'newprice',
  render: text => <span className={styles.rigth}>{text === 0 ? '' : formatter.format(text)}</span>,
}, {
  title: 'Нийт дүн',
  dataIndex: 'totalamount',
  key: 'totalamount',
  render: text => <span className={styles.rigth}>{text === 0 ? '' : formatter.format(text)}</span>,
}, {
  title: 'Хямдрал хувь',
  dataIndex: 'discountpercent',
  key: 'discountpercent',
  render: text => <span className={styles.rigth}>{text === 0 ? '' : `${formatter.format(text)}%`}</span>,
}, {
  title: 'Хямдарсан дүн',
  dataIndex: 'discountamount',
  key: 'discountamount',
  render: text => <span className={styles.rigth}>{text === 0 ? '' : formatter.format(text)}</span>,
}, {
  title: 'Захиалгын дүн',
  dataIndex: 'orderamount',
  key: 'orderamount',
  render: text => <span className={styles.rigth}>{text === 0 ? '' : formatter.format(text)}</span>,
}, {
  title: 'НӨАТ-ийн дүн',
  dataIndex: 'vatamount',
  key: 'vatamount',
  render: text => <span className={styles.rigth}>{text === 0 ? '' : formatter.format(text)}</span>,
}, {
  title: 'НӨАТ-гүй дүн',
  dataIndex: 'nonvatamount',
  key: 'nonvatamount',
  render: text => <span className={styles.rigth}>{text === 0 ? '' : formatter.format(text)}</span>,
}];

// хүснэгтийн багана
const incomplete = [{
  title: 'Барааны код',
  dataIndex: 'skucd',
  key: 'skucd',
}, {
  title: 'Барааны нэр',
  dataIndex: 'skunm',
  key: 'skunm',
}, {
  title: 'Тоо хэмжээ',
  dataIndex: 'quantity',
  key: 'quantity',
  render: text => <span className={styles.center}>{formatter.format(text)}</span>,
}, {
  title: 'Бэлтгэсэн',
  dataIndex: 'newprice',
  key: 'newprice',
  render: text => <span className={styles.rigth}>{text === 0 ? '' : formatter.format(text)}</span>,
}, {
  title: 'Зөрүү',
  dataIndex: 'totalamount',
  key: 'totalamount',
  render: text => <span className={styles.rigth}>{text === 0 ? '' : formatter.format(text)}</span>,
}, {
  title: 'Захиалгын дүн',
  dataIndex: 'orderamount',
  key: 'orderamount',
  render: text => <span className={styles.rigth}>{text === 0 ? '' : formatter.format(text)}</span>,
}, {
  title: 'Бэлтгэсэн дүн',
  dataIndex: 'orderamount',
  key: 'orderamount',
  render: text => <span className={styles.rigth}>{text === 0 ? '' : formatter.format(text)}</span>,
}, {
  title: 'Зөрүү дүн',
  dataIndex: 'orderamount',
  key: 'orderamount',
  render: text => <span className={styles.rigth}>{text === 0 ? '' : formatter.format(text)}</span>,
}, {
  title: 'Захиалгын хямдрал',
  dataIndex: 'vatamount',
  key: 'vatamount',
  render: text => <span className={styles.rigth}>{text === 0 ? '' : formatter.format(text)}</span>,
}, {
  title: 'Бэлтгэгдсэн хямдрал',
  dataIndex: 'nonvatamount',
  key: 'nonvatamount',
  render: text => <span className={styles.rigth}>{text === 0 ? '' : formatter.format(text)}</span>,
}];

class Component extends React.Component {
  render() {
    return (
      <Modal
        title="Захиалгын дэлгэрэнгүй"
        visible={this.props.visible}
        footer={null}
        onCancel={this.props.onCancel}
        onOk={this.props.onCancel}
        width={'60%'}
        style={{ top: 20 }}
        destroyOnClose
      >
        <Content {...this.props} />
      </Modal>
    );
  }
}

export default Component;

// eslint-disable-next-line react/no-multi-comp
class Content extends React.Component {
  state = {
    loading: true,
    data: [],
    detail: [],
    isAmountHistory: false, // Төлбөр төлөлтийн түүх харах эсэх
    isAddAmount: false, // Төлбөр төлөлт өөрчилөх эсэх
    isStatusHistory: false,
    isDeliveryHistory: false,
  }

  componentDidMount() {
    this.props.getDetail({ id: this.props.row.id })
      .then(res => this.setState({ loading: false, data: this.props.detail.orderDetail, detail: this.props.detail.orderList }));
  }

  // RENDER DETAIL AND METHOD'S
  handleAmountHistory = () => { this.setState({ isAmountHistory: !this.state.isAmountHistory }); }
  handleAddAmount = () => { this.setState({ isAddAmount: !this.state.isAddAmount }); }
  handleStatusHistory = () => { this.setState({ isStatusHistory: !this.state.isStatusHistory }); }
  handleDeliveryHistory = () => { this.setState({ isDeliveryHistory: !this.state.isDeliveryHistory }); }

  handleApprove = () => {
    this.props.amountApprove({ id: this.state.detail.id }).then((res) => {
      this.props.onCancel();
      this.props.refresh();
    });
  }

  renderFooter = () => (
    <div className={styles.tableFooter}>
      <div className={styles.footerInfo}>
      Захиалсан барааны нийт дүн:{" "}
        {this.props.dataSource.data === undefined
          ? 0
          : formatter.format(this.state.detail.orderamount)}
      </div>
    </div>
  );

  renderDetail = () => {
    try {
      const { data, detail } = this.state;
      const { row } = this.props;

      const formItemLayout = {
        labelCol: { span: 10 },
        wrapperCol: { span: 14 },
      };

      return (
        <div>
          <Collapse defaultActiveKey={['0', '1', '2', '3', '4']} className={styles.collapse}>
            <Collapse.Panel header="Захиалга болон худалдан авагчийн мэдээлэл">
              <Col span={12}>
                <Form>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="Захиалгын №">
                    <Input
                      size="small"
                      disabled
                      className={styles.disabled}
                      value={detail.ordernumber}
                      addonAfter={
                      row.orderstatusgroupid === 1 ?
                        <Tooltip placement="top" title="Төлөв өөрчлөлтийн түүх" >
                          <Icon type="ordered-list" />
                        </Tooltip> : ''
                    }
                    />
                  </Form.Item>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="Захиалгын огноо">
                    <Input size="small" disabled className={styles.disabled} value={detail.orderdate} />
                  </Form.Item>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="Төлөв">
                    <Input size="small" disabled className={styles.disabled} value={detail.orderstatusnm} />
                  </Form.Item>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="Төлбөрийн хэлбэр">
                    <Input size="small" disabled className={styles.disabled} value={detail.paymenttypenm} />
                  </Form.Item>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="Захиалга хийгдсэн IP">
                    <Input size="small" disabled className={styles.disabled} value={''} />
                  </Form.Item>
                  {
                  detail.paymenttype === 1 ? (
                    <div>
                      <Form.Item {...formItemLayout} className={styles.formItem} label="Имерчант банк">{/** only Имерчант */}
                        <Input size="small" disabled className={styles.disabled} value={''} />
                      </Form.Item>
                      <Form.Item {...formItemLayout} className={styles.formItem} label="Зөвшөөрлийн код">{/** only Имерчант */}
                        <Input size="small" disabled className={styles.disabled} value={''} />
                      </Form.Item>
                      <Form.Item {...formItemLayout} className={styles.formItem} label="Холболт тайлбар">{/** only Имерчант */}
                        <Input size="small" disabled className={styles.disabled} value={''} />
                      </Form.Item>
                    </div>
                  ) : null
                }
                </Form>
              </Col>

              <Col span={12}>
                <Form>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="Овог">
                    <Input size="small" disabled className={styles.disabled} value={detail.lastname} />
                  </Form.Item>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="Нэр">
                    <Input size="small" disabled className={styles.disabled} value={detail.firstname} />
                  </Form.Item>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="Утасны дугаар 1">
                    <Input size="small" disabled className={styles.disabled} value={detail.phone1} />
                  </Form.Item>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="Утасны дугаар 2">
                    <Input size="small" disabled className={styles.disabled} value={detail.phone2} />
                  </Form.Item>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="И-мэйл">
                    <Input size="small" disabled className={styles.disabled} value={detail.email} />
                  </Form.Item>
                  <Form.Item {...formItemLayout} style={{ margin: 0 }} label="ePoint card">
                    <Input size="small" disabled className={styles.disabled} value={detail.ecardno} />
                  </Form.Item>
                </Form>
              </Col>
            </Collapse.Panel>
            <Collapse.Panel header="Хүргэлтийн мэдээлэл">
              <Col span={12}>
                <Form>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="Хүргэлтийн №">
                    <Input size="small" disabled className={styles.disabled} value={detail.trucknumber} />
                  </Form.Item>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="Хүргэлтийн төрөл">
                    {
                    row.orderstatusgroupid === 1 ?
                      <Input
                        size="small"
                        disabled
                        className={styles.disabled}
                        value={detail.deliverytypenm}
                        addonAfter={
                          <div>
                            <Tooltip placement="top" title="Хүргэлтийн төрөл өөрчлөх" >
                              <Icon
                                type="plus"
                                onClick={this.handleDeliveryHistory}
                                style={{
                                  border: 'solid #d9d9d9', borderRightWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, padding: 5, paddingRight: 10, paddingLeft: 0,
                                }}
                              />
                            </Tooltip>
                            <Tooltip placement="top" title="Хүргэлтийн төрөл өөрчлөлтийн түүх" >
                              <Icon type="ordered-list" onClick={this.handleDeliveryHistory} style={{ padding: 5, marginLeft: 5, paddingRight: 0 }} />
                            </Tooltip>
                          </div>
                        }
                      /> :
                      <Input
                        size="small"
                        disabled
                        className={styles.disabled}
                        value={detail.deliverytypenm}
                        addonAfter={
                          <Tooltip placement="top" title="Хүргэлтийн төрөл өөрчлөлтийн түүх" >
                            <Icon type="ordered-list" onClick={this.handleDeliveryHistory} />
                          </Tooltip>
                        }
                      />
                  }
                  </Form.Item>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="Дүүрэг">
                    <Input size="small" disabled className={styles.disabled} value={detail.districtnm} />
                  </Form.Item>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="Хороо">
                    <Input size="small" disabled className={styles.disabled} value={detail.committeenm} />
                  </Form.Item>
                  <Form.Item {...formItemLayout} style={{ margin: 0 }} label="Хаяг">
                    <Input size="small" disabled className={styles.disabled} value={detail.address} />
                  </Form.Item>
                </Form>
              </Col>
              <Col span={12}>
                <Form>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="Хүргэх огноо">
                    <Input size="small" disabled className={styles.disabled} value={detail.deliverydate} />
                  </Form.Item>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="Хүргэсэн огноо">
                    <Input size="small" disabled className={styles.disabled} value={detail.delivereddate} />
                  </Form.Item>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="Захиалга гарах салбар">
                    <Input size="small" disabled className={styles.disabled} value={detail.outofstore} />
                  </Form.Item>
                </Form>
              </Col>
            </Collapse.Panel>
            <Collapse.Panel header="Захиалгын дэлгэрэнгүй мэдээлэл">
              <Col span={12}>
                <h4 className={styles.title}>Урьдчилсан захиалгын мэдээлэл</h4>
                <Form>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="Захиалгын барааны дүн">
                    <Input size="small" disabled className={styles.disabled} value={formatter.format(detail.orderamount)} />
                  </Form.Item>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="Нийт хямдралын дүн">
                    <Input size="small" disabled className={styles.disabled} value={formatter.format(detail.totaldiscount)} />
                  </Form.Item>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="Захиалгын төлөх дүн">
                    <Input size="small" disabled className={styles.disabled} value={formatter.format(detail.payamount)} />
                  </Form.Item>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="Хүргэлтийн төлбөр">
                    <Input size="small" disabled className={styles.disabled} value={formatter.format(detail.deliveryamount)} />
                  </Form.Item>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="НӨАТ">
                    <Input size="small" disabled className={styles.disabled} value={formatter.format(detail.vatamount)} />
                  </Form.Item>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="Оноогоор">
                    <Input size="small" disabled className={styles.disabled} value={formatter.format(detail.outpoint)} />
                  </Form.Item>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="Нийт төлөх дүн">
                    <Input size="small" disabled className={`${styles.disabled} ${styles.boldText}`} value={formatter.format(detail.totalamount)} />
                  </Form.Item>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="Төлсөн">
                    {// Төлбөрийн хэлбэр нь дансаар хийсэн тохиолдолд үнийэ дүнг нэмэх боломжтой байна.
                    detail.paymenttype === 2 ? (
                      <div>
                        <Input
                          size="small"
                          disabled
                          className={`${styles.disabled} ${styles.boldText}`}
                          addonAfter={
                            <div className={styleMedia.disabled}>
                              <Tooltip placement="top" title={'Төлсөн дүн оруулах'}>
                                <Icon
                                  type="plus"
                                  onClick={this.handleAddAmount}
                                />
                              </Tooltip>
                            </div>
                          }
                          value={formatter.format(detail.paidamount)}
                        />
                      </div>
                    ) :
                      <Input
                        size="small"
                        disabled
                        className={`${styles.disabled} ${styles.boldText}`}
                        value={detail.paidamount}
                        addonAfter={
                          <div className={styleMedia.disabled}>
                            <Tooltip placement="top" title={'Төлөлтийн түүх'}>
                              <Icon
                                type="ordered-list"
                              />
                            </Tooltip>
                          </div>
                        }
                      />
                  }
                  </Form.Item>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="Зөрүү дүн">
                    <Input
                      size="small"
                      className={`${detail.varianceamount < 0 ? styles.negativeValue : ''}`}
                      value={formatter.format(detail.varianceamount)}
                    />
                  </Form.Item>
                </Form>
              </Col>


              <Col span={12}>
                <h4 className={styles.title}>Бэлтгэгдсэн захиалгын мэдээлэл</h4>
                <Form>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="Бэлтгэгдсэн нийт дүн">
                    <Input size="small" disabled className={styles.disabled} />
                  </Form.Item>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="Нийт хямдралын дүн">
                    <Input size="small" disabled className={styles.disabled} />
                  </Form.Item>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="Захиалгын төлөх дүн">
                    <Input size="small" disabled className={styles.disabled} />
                  </Form.Item>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="Хүргэлтийн төлбөр">
                    <Input size="small" disabled className={styles.disabled} />
                  </Form.Item>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="НӨАТ ">
                    <Input size="small" disabled className={styles.disabled} />
                  </Form.Item>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="Оноогоор">
                    <Input size="small" disabled className={styles.disabled} />
                  </Form.Item>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="Нийт төлөх дүн">
                    <Input size="small" disabled className={styles.disabled} />
                  </Form.Item>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="Төлсөн">
                    <Input size="small" disabled className={styles.disabled} />
                  </Form.Item>
                  <Form.Item {...formItemLayout} className={styles.formItem} label="Буцааж шилжүүлэх дүн">
                    <Input size="small" disabled className={styles.disabled} />
                  </Form.Item>
                  <Form.Item {...formItemLayout} style={{ margin: 0 }} label="Санхүү шилжүүлсэн эсэх">
                    <Input size="small" disabled className={styles.disabled} />
                  </Form.Item>
                </Form>
              </Col>
            </Collapse.Panel>
            <Collapse.Panel header="Захиалсан барааны мэдээлэл">
              <Table
                bordered
                size="small"
                dataSource={data}
                columns={row.orderstatusgroupid === 1 ? incomplete : columns}
                footer={this.renderFooter}
                pagination={false}
                rowKey={record => record.skucd}
              />
            </Collapse.Panel>
          </Collapse>

          <div className={styles.parent} style={{ marginTop: 20 }}>
            <div className={styles.column}>
              <Button
                type="danger"
                style={{ display: 'flex', justifyContent: 'flex-start' }}
              >Захиалгаас татгалзсан
              </Button>
            </div>
            <div className={styles.column} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="primary"
              >Дахин хүргэлтэд гаргах
              </Button>
            </div>
          </div>
        </div>
      );
    } catch (error) {
      return console.log(error);
    }
  }

  // RENDER AMOUNT HISTORY
  renderAmountHistory = () => {
    try {
      const { isAmountHistory, detail } = this.state;

      return (
        <AmountHistoryModal
          id={detail.id}
          visible={isAmountHistory}
          onCancel={this.handleAmountHistory}
          select={this.props.filter}
          getAmountHistory={this.props.getAmountHistory}
          data={this.props.amountHistory}
        />
      );
    } catch (error) {
      return console.log(error);
    }
  }

  // RENDER AMOUNT CHANGE MODAL
  handleOkAddAmount = (amount) => {
    const { detail } = this.state;
    detail.varianceamount -= amount;
    detail.paidamount += amount;
    this.setState({ detail });
  }

  renderAddAmountModal = () => {
    try {
      const { detail, isAddAmount } = this.state;
      return (
        <AddAmountModal
          id={detail.id}
          visible={isAddAmount}
          onCancel={this.handleAddAmount}
          onOk={this.handleOkAddAmount}
          select={this.props.filter}
          addAmount={this.props.addAmount}
        />
      );
    } catch (error) {
      return console.log('error: ', error);
    }
  }

  renderChangeStatusHistory = () => {
    try {
      const { isStatusHistory, detail } = this.state;

      return (
        <ChangeStatusHistory
          id={detail.id}
          visible={isStatusHistory}
          onCancel={this.handleStatusHistory}
          select={this.props.filter}
          getData={this.props.statusHistory}
          data={this.props.statusHis}
        />
      );
    } catch (error) {
      return console.log(error);
    }
  }

  renderDeliveryHistory = () => {
    try {
      const { isDeliveryHistory, detail } = this.state;

      return (
        <DeliveryTypeHistory
          id={detail.id}
          visible={isDeliveryHistory}
          onCancel={this.handleDeliveryHistory}
          select={this.props.filter}
          getAmountHistory={this.props.getAmountHistory}
          data={this.props.amountHistory}
        />
      );
    } catch (error) {
      return console.log(error);
    }
  }

  render() {
    const { loading } = this.state;

    if (!loading) {
      return (
        <div>
          {this.renderDetail()}
          {this.renderAddAmountModal()}
          {this.renderAmountHistory()}
          {this.renderChangeStatusHistory()}
          {this.renderDeliveryHistory()}
        </div>
      );
    }

    return (
      <div style={{ marginLeft: '49%', paddingTop: '15%', paddingBottom: '15%' }}><Spin /></div>
    );
  }
}
