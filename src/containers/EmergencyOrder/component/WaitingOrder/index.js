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

class Component extends React.Component {
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

  renderDetail = () => {
    try {
      const { data, detail } = this.state;
      const formatter = new Intl.NumberFormat("en-US");

      const formItemLayout = {
        labelCol: { span: 10 },
        wrapperCol: { span: 14 },
      };

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
        title: 'Тоо ширхэг',
        dataIndex: 'quantity',
        key: 'quantity',
        render: text => <span>{text === 0 ? '' : formatter.format(text)}</span>,
      }, {
        title: 'Худалдах үнэ',
        dataIndex: 'price',
        key: 'price',
        render: text => <span>{text === 0 ? '' : formatter.format(text)}</span>,
      }, {
        title: 'Нийт үнэ',
        dataIndex: 'totalamount',
        key: 'totalamount',
        render: text => <span>{text === 0 ? '' : formatter.format(text)}</span>,
      }, {
        title: 'Хямдрал дүн',
        dataIndex: 'newprice',
        key: 'newprice',
        render: text => <span>{text === 0 ? '' : formatter.format(text)}</span>,
      }, {
        title: 'Цэвэр дүн',
        dataIndex: 'nettotalamount',
        key: 'nettotalamount',
        render: text => <span>{text === 0 ? '' : formatter.format(text)}</span>,
      }, {
        title: 'НӨАТ-ийн дүн',
        dataIndex: 'vatamount',
        key: 'vatamount',
        render: text => <span>{text === 0 ? '' : formatter.format(text)}</span>,
      }, {
        title: 'НӨАТ-гүй дүн',
        dataIndex: 'nonvatamount',
        key: 'nonvatamount',
        render: text => <span>{text === 0 ? '' : formatter.format(text)}</span>,
      }];

      return (
        <Collapse defaultActiveKey={['0', '1', '2', '3', '4']}>
          <Collapse.Panel header="Захиалга болон худалдан авагчийн мэдээлэл Төлбөр хүлээгдэж байгаа 1">
            <Col span={12}>
              <Form>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Захиалгын №">
                  <Input
                    value={detail.ordernumber}
                    addonAfter={
                      <Tooltip placement="top" title="Төлөв өөрчлөлтийн түүх" >
                        <Icon type="ordered-list" onClick={this.handleStatusHistory} />
                      </Tooltip>
                    }
                  />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Захиалгын огноо">
                  <Input value={detail.orderdate} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Төлөв">
                  <Input value={detail.orderstatusnm} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Төлбөрийн хэлбэр">
                  <Input value={detail.paymenttypenm} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Захиалга хийгдсэн IP">
                  <Input value={''} />
                </Form.Item>
                {
                  detail.paymenttype === 1 ? (
                    <div>
                      <Form.Item {...formItemLayout} className={styles.formItem} label="Имерчант банк">{/** only Имерчант */}
                        <Input value={''} />
                      </Form.Item>
                      <Form.Item {...formItemLayout} className={styles.formItem} label="Зөвшөөрлийн код">{/** only Имерчант */}
                        <Input value={''} />
                      </Form.Item>
                      <Form.Item {...formItemLayout} className={styles.formItem} label="Холболт тайлбар">{/** only Имерчант */}
                        <Input value={''} />
                      </Form.Item>
                    </div>
                  ) : null
                }
              </Form>
            </Col>

            <Col span={12}>
              <Form>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Овог">
                  <Input value={detail.lastname} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Нэр">
                  <Input value={detail.firstname} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Утасны дугаар 1">
                  <Input value={detail.phone1} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Утасны дугаар 2">
                  <Input value={detail.phone2} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="И-мэйл">
                  <Input value={detail.email} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="ePoint card">
                  <Input value={detail.ecardno} />
                </Form.Item>
              </Form>
            </Col>
          </Collapse.Panel>
          <Collapse.Panel header="Хүргэлтийн мэдээлэл">
            <Col span={12}>
              <Form>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Хүргэлтийн №">
                  <Input value={detail.trucknumber} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Хүргэлтийн төрөл">
                  <Input
                    value={detail.deliverytypenm}
                    addonAfter={
                      <Tooltip placement="top" title="Хүргэлтийн төрөл өөрчлөлтийн түүх" >
                        <Icon type="ordered-list" onClick={this.handleDeliveryHistory} />
                      </Tooltip>
                    }
                  />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Дүүрэг">
                  <Input value={detail.districtnm} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Хороо">
                  <Input value={detail.committeenm} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Хаяг">
                  <Input value={detail.address} />
                </Form.Item>
              </Form>
            </Col>
            <Col span={12}>
              <Form>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Хүргэх огноо">
                  <Input value={detail.deliverydate} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Хүргэсэн огноо">
                  <Input value={detail.delivereddate} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Захиалга гарах салбар">
                  <Input value={detail.outofstore} />
                </Form.Item>
              </Form>
            </Col>
          </Collapse.Panel>
          <Collapse.Panel header="Захиалгын дэлгэрэнгүй мэдээлэл">
            <Col span={12}>
              <h4 className={styles.title}>Урьдчилсан захиалгын мэдээлэл</h4>
              <Form>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Захиалгын барааны дүн">
                  <Input value={formatter.format(detail.orderamount)} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Нийт хямдралын дүн">
                  <Input value={formatter.format(detail.totaldiscount)} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Захиалгын төлөх дүн">
                  <Input value={formatter.format(detail.payamount)} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Хүргэлтийн төлбөр">
                  <Input value={formatter.format(detail.deliveryamount)} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="НӨАТ ">
                  <Input value={formatter.format(detail.vatamount)} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Оноогоор">
                  <Input value={formatter.format(detail.outpoint)} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Нийт төлөх дүн">
                  <Input value={formatter.format(detail.totalamount)} className={styles.boldText} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Төлсөн">
                  {// Төлбөрийн хэлбэр нь дансаар хийсэн тохиолдолд үнийэ дүнг нэмэх боломжтой байна.
                    detail.paymenttype === 2 ? (
                      <div>
                        <Input
                          addonAfter={
                            <div>
                              <Tooltip placement="top" title={'Төлсөн дүн оруулах'}>
                                <Icon
                                  type="plus"
                                  onClick={this.handleAddAmount}
                                  style={{
                                    border: 'solid #d9d9d9', borderRightWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, padding: 5, paddingRight: 10, paddingLeft: 0,
                                  }}
                                />
                              </Tooltip>
                              <Tooltip placement="top" title="Төлөлтийн түүх" >
                                <Icon type="ordered-list" style={{ padding: 5, marginLeft: 5, paddingRight: 0 }} onClick={this.handleAmountHistory} />
                              </Tooltip>
                            </div>
                          }
                          value={formatter.format(detail.paidamount)}
                          className={styles.boldText}
                        />
                      </div>
                    ) : (
                      <div>
                        <Input className={styles.boldText} value={detail.paidamount} />
                      </div>)
                  }
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Зөрүү дүн">
                  <Input
                    value={formatter.format(detail.varianceamount)}
                    className={detail.varianceamount < 0 ? styles.negativeValue : ''}
                  />
                </Form.Item>
              </Form>
            </Col>


            <Col span={12}>
              <h4 className={styles.title}>Бэлтгэгдсэн захиалгын мэдээлэл</h4>
              <Form>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Бэлтгэгдсэн нийт дүн">
                  <Input />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Нийт хямдралын дүн">
                  <Input />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Захиалгын төлөх дүн">
                  <Input />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Хүргэлтийн төлбөр">
                  <Input />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="НӨАТ ">
                  <Input />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Оноогоор">
                  <Input />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Нийт төлөх дүн">
                  <Input />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Төлсөн">
                  <Input />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Буцааж шилжүүлэх дүн">
                  <Input />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Санхүү шилжүүлсэн эсэх">
                  <Input />
                </Form.Item>
              </Form>
            </Col>
          </Collapse.Panel>
          <Collapse.Panel header="Захиалсан барааны мэдээлэл">
            <Table
              bordered
              size="small"
              dataSource={data}
              columns={columns}
              footer={null}
              pagination={false}
              rowKey={record => record.skucd}
            />

            <div>
              {
                detail.paymenttype === 2 ? (
                  <div style={{
                    float: "right", marginTop: 10, padding: 10, paddingRight: 0,
                    }}
                  >
                    <Button
                      type="primary"
                      onClick={this.handleApprove}
                      disabled={!(detail.varianceamount <= 0)}
                    ><Icon type="save" />Баталгаажуулах
                    </Button>
                  </div>
                ) : null
              }
            </div>
          </Collapse.Panel>
        </Collapse>
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
          getAmountHistory={this.props.getAmountHistory}
          data={this.props.amountHistory}
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

export default Component;
