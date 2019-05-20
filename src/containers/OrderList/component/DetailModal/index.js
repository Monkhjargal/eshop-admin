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
import tableStyle from "../../../../components/StandardTable/index.less";

const formatter = new Intl.NumberFormat("en-US");

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
    <div className={tableStyle.tableFooter}>
      <div className={tableStyle.footerInfo}>
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
        title: 'Хямдралын дүн',
        dataIndex: 'discountamount',
        key: 'discountamount',
        render: text => <span className={styles.rigth}>{text === 0 ? '' : formatter.format(text)}</span>,
      }, {
        title: 'Захиалгын дүн',
        dataIndex: 'orderamount',
        key: 'orderamount',
        render: text => <span className={styles.rigth}>{text === 0 ? '' : formatter.format(text)}</span>,
      }, {
        title: 'НХАТ',
        dataIndex: 'citytaxamount',
        key: 'citytaxamount',
        render: text => <span className={styles.rigth}>{text === 0 ? '' : formatter.format(text)}</span>,
      }, {
        title: 'НӨАТ дүн',
        dataIndex: 'vatamount',
        key: 'vatamount',
        render: text => <span className={styles.rigth}>{text === 0 ? '' : formatter.format(text)}</span>,
      }, {
        title: 'НӨАТ-гүй дүн',
        dataIndex: 'nonvatamount',
        key: 'nonvatamount',
        render: text => <span className={styles.rigth}>{text === 0 ? '' : formatter.format(text)}</span>,
      }];

      return (
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
                  />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Захиалгын огноо">
                  <Input size="small" disabled className={styles.disabled} value={detail.orderdate} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Төлөв">
                  <Input
                    size="small"
                    disabled
                    className={`${row.orderstatusgroupid === 1 ? styles.statusOneM : row.orderstatusgroupid === 2 ? styles.statusTwoM : styles.statusThreeM}`}
                    value={detail.orderstatusnm}
                    addonAfter={
                      <Tooltip placement="top" title="Төлөв өөрчлөлтийн түүх" >
                        <Icon type="ordered-list" onClick={this.handleStatusHistory} />
                      </Tooltip>
                    }
                  />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Төлбөрийн хэлбэр">
                  <Input size="small" disabled className={styles.disabled} value={detail.paymenttypenm} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Захиалга хийгдсэн IP">
                  <Input size="small" disabled className={styles.disabled} value={detail.ipaddress} />
                </Form.Item>
                {
                  detail.paymenttype === 1 ? (
                    <div>
                      <Form.Item {...formItemLayout} className={styles.formItem} label="Имерчант банк">{/** only Имерчант */}
                        <Input size="small" disabled className={styles.disabled} value={detail.banknm} />
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
                <Form.Item {...formItemLayout} className={styles.formItem} label="Утасны № 1">
                  <Input size="small" disabled className={styles.disabled} value={detail.phone1} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Утасны № 2">
                  <Input size="small" disabled className={styles.disabled} value={detail.phone2} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="И-мэйл">
                  <Input size="small" disabled className={styles.disabled} value={detail.email} />
                </Form.Item>
                <Form.Item {...formItemLayout} label="ePoint card" style={{ margin: 0 }}>
                  <Input size="small" disabled className={styles.disabled} value={detail.ecardno} />
                </Form.Item>
              </Form>
            </Col>
          </Collapse.Panel>
          <Collapse.Panel header="Хүргэлтийн мэдээлэл">
            <Col span={12} style={{ padding: 5 }}>
              <Form>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Хүргэлтийн №">
                  <Input size="small" disabled className={styles.disabled} value={detail.trucknumber} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Хүргэлтийн төрөл">
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
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Дүүрэг">
                  <Input size="small" disabled className={styles.disabled} value={detail.districtnm} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Хороо">
                  <Input size="small" disabled className={styles.disabled} value={detail.committeenm} />
                </Form.Item>
                <Form.Item {...formItemLayout} label="Хаяг" style={{ margin: 0 }}>
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
                <Form.Item {...formItemLayout} className={styles.formItem} label="Нийт дүн">
                  <Input size="small" disabled className={styles.disabled} value={formatter.format(detail.totalamount)} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Хямдралын дүн">
                  <Input size="small" disabled className={styles.disabled} value={formatter.format(detail.totaldiscount)} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Захиалгын дүн">
                  <Input size="small" disabled className={styles.disabled} value={formatter.format(detail.orderamount)} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Хүргэлтийн төлбөр">
                  <Input size="small" disabled className={styles.disabled} value={formatter.format(detail.deliveryamount)} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Оноогоор">
                  <Input size="small" disabled className={styles.disabled} value={formatter.format(detail.outpoint)} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Төлвөл зохих">
                  <Input size="small" disabled className={`${styles.disabled} ${styles.boldText}`} value={formatter.format(detail.payamount)} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Төлсөн дүн">
                  {// Төлбөрийн хэлбэр нь дансаар хийсэн тохиолдолд үнийэ дүнг нэмэх боломжтой байна.
                    detail.paymenttype === 2 ? (
                      <div>
                        <Input
                          size="small"
                          disabled
                          className={`${styles.disabled} ${styles.boldText}`}
                          addonAfter={
                            <div className={styleMedia.disabled}>
                              <Tooltip placement="top" title="Төлөлтийн түүх" >
                                <Icon type="ordered-list" style={{ padding: 5, paddingRight: 0 }} onClick={this.handleAmountHistory} />
                              </Tooltip>
                            </div>
                          }
                          value={formatter.format(detail.paidamount)}
                        />
                      </div>
                    ) : (
                      <div>
                        <Input size="small" disabled className={`${styles.disabled} ${styles.boldText}`} value={detail.paidamount} />
                      </div>)
                  }
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Зөрүү дүн">
                  <Input
                    size="small"
                    className={`${detail.varianceamount < 0 ? styles.negativeValue : ''}`}
                    value={formatter.format(detail.varianceamount)}
                  />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="НӨАТ">
                  <Input size="small" disabled className={styles.disabled} value={formatter.format(detail.vatamount)} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="НХАТ">
                  <Input size="small" disabled className={styles.disabled} value={detail.citytaxamount} />
                </Form.Item>
              </Form>
            </Col>


            <Col span={12}>
              <h4 className={styles.title}>Бэлтгэгдсэн захиалгын мэдээлэл</h4>
              <Form>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Нийт дүн">
                  <Input size="small" disabled className={styles.disabled} value={detail.ptotalamount} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Хямдралын дүн">
                  <Input size="small" disabled className={styles.disabled} value={detail.ptotaldiscount} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Захиалгын дүн">
                  <Input size="small" disabled className={styles.disabled} value={detail.porderamount} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Хүргэлтийн төлбөр">
                  <Input size="small" disabled className={styles.disabled} value={detail.pdeliveryamount} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Оноогоор">
                  <Input size="small" disabled className={styles.disabled} value={detail.poutpoint} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Төлвөл зохих">
                  <Input size="small" disabled className={styles.disabled} value={detail.ppayamount} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Төлсөн дүн">
                  <Input size="small" disabled className={styles.disabled} value={detail.ppaidamount} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="Буцааж шилжүүлэх дүн">
                  <Input size="small" disabled className={styles.disabled} value={detail.pvarianceamount} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="НӨАТ ">
                  <Input size="small" disabled className={styles.disabled} value={detail.pvatamount} />
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.formItem} label="НХАТ ">
                  <Input size="small" disabled className={styles.disabled} value={detail.pcitytaxamount} />
                </Form.Item>
                <Form.Item {...formItemLayout} style={{ margin: 0 }} label="Санхүү шилжүүлсэн огноо">
                  <Input size="small" disabled className={styles.disabled} value={detail.transactiondate} />
                </Form.Item>
              </Form>
            </Col>
          </Collapse.Panel>
          <Collapse.Panel header="Захиалсан барааны мэдээлэл">
            <div className={tableStyle.subTable}>
              <Table
                bordered
                size="small"
                dataSource={data}
                columns={columns}
                footer={this.renderFooter}
                pagination={false}
                rowKey={record => record.skucd}
                style={{ marginTop: 10 }}
              />
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
