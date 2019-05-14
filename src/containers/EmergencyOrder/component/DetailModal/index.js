/**
 * COMPONENT NAME:                                      ORDER DETAIL
 * CREATED BY:                                          **BATTSOGT BATGERELT**
 * CREARED DATED:                                       2019-04-19
 * DESCRIPTION:                                         ORDER DETAIL, CHANGE AMOUNT, STATUS CHANGE HISTORY
 */

import React from "react";
import { Modal, Collapse, Spin, Col, Input, Form, Table, Icon, Tooltip, Button } from "antd";

import { ConfirmOrder, WaitingOrder } from '../';
import styles from "../../styles.less";

class Component extends React.Component {
  render() {
    const { row } = this.props;
    return (
      <Modal
        title="Яаралтай шийдвэрлэх захиалгын дэлгэрэнгүй"
        visible={this.props.visible}
        footer={null}
        onCancel={this.props.onCancel}
        onOk={this.props.onCancel}
        width={'60%'}
        destroyOnClose
      >
        {
          row.orderstatusgroupid === 1 ? <WaitingOrder {...this.props} /> :
            row.orderstatusgroupid === 2 ? <ConfirmOrder {...this.props} /> :
              row.orderstatusgroupid === 3 ? <ConfirmOrder {...this.props} /> : console.log(row.orderstatusgroupnm, row.orderstatusgroupid)
        }

      </Modal>
    );
  }
}

export default Component;
