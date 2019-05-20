import React from "react";
import { PrintTool } from "react-print-tool";
import { Table, Button, Icon } from "antd";

import styles from "./styles.less";
import logo from "../../assets/images/emart-logo.png";

class Component extends React.Component {
  state = {
    loading: false,
  }
  renderPrintHeader = () => (
    <div className={styles.parent}>
      <img alt="print-title-logo" src={logo} width={120} height={35} />
      <span className={`${styles.reportname} ${styles.column}`} >{this.props.name}</span>
    </div>
  )

  renderPrintTable = () => {
    try {
      const { headers, data } = this.props;

      headers.map(i => i.sorter = false);

      return (
        <div className={styles.standardTable}>
          <Table
            bordered
            size="small"
            style={{ marginTop: 15 }}
            sorter
            dataSource={data}
            columns={headers}
            pagination={false}
          />
        </div>

      );
    } catch (error) { return console.log(error); }
  }

  handlePrint = () => {
    this.printer();
    this.setState({ loading: false });
  }

  printer = () => {
    try {
      this.setState({ loading: true });
      return PrintTool.printFromReactComponent(
        <div>
          {this.renderPrintHeader()}
          {this.renderPrintTable()}
        </div>,
      );
    } catch (error) { return console.log(error); }
  }

  render() {
    const { loading } = this.state;
    return (
      <Button onClick={this.handlePrint} type="dashed" style={{ borderColor: 'rgb(0, 124, 195)' }} loading={loading} >
        <Icon type="printer" style={{ color: 'rgb(0, 124, 195)' }} />
      </Button>
    );
  }
}

export default Component;
