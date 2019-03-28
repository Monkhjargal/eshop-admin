import React from "react";
import { Modal } from "antd";
import Main from "./main";

// Ene Modal duudagdah bolgond did mount deeree api request ee yvuulj tuhain baraanii tuluv oorchiloltiin tuuhiig harah
// ene js file dotor did mount ni ajillhagui bsan tul main.js dotor modal-iin
class Component extends React.Component {
  render() {
    return (
      <div>
        <Modal
          title="Барааны төлөв өөрчлөлтийн түүх"
          visible={this.props.visible}
          footer={null}
          onCancel={this.props.onCancel}
          width={'60%'}
          destroyOnClose
        >
          <Main
            getStatusHistory={this.props.getStatusHistory}
            skucd={this.props.skucd}
            name={this.props.name}
            statusHistory={this.props.statusHistory}
          />
        </Modal>
      </div>
    );
  }
}

export default Component;
