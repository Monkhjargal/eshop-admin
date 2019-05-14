import React from "react";
import { Form, Spin, Table, Col, Row, Button, Icon, Input, Transfer } from "antd";

import styles from "./styles.less";

class Component extends React.Component {
  state = {
    unselected: [],
    selected: [],
    loading: true,
    bloading: false,
  }

  componentWillMount() {
    this.props.getData({ id: this.props.id })
      .then((res) => {
        this.setState({ loading: false });
        this.renderProduct();
      });
  }

  renderProduct = () => {
    const { response } = this.props;
    console.log('response: ', response);
    const selected = [];
    const unselected = [];

    response.data.map((item) => {
      const data = {
        key: item.skucd,
        skucd: `${item.skucd}`,
        skunm: `${item.skunm}`,
        catnm: `${item.catnm}`,
        chosen: `${item.state}`,
      };
      if (data.chosen === '1') { selected.push(data.key); }
      return unselected.push(data);
    });

    this.setState({ unselected, selected });
  }

  handleChange = (selected) => {
    // console.log(targetKeys, direction, moveKeys);
    this.setState({ selected });
  }

  handleSave = () => {
    this.setState({ bloading: true });
    const { stepOneData } = this.props;
    let formData = new FormData();

    this.state.selected.map(i => formData.append("skucds", i));
    Object.keys(stepOneData).map(keyname => (keyname === 'fileList' || keyname === 'imageList' ? '' : formData.append(keyname, stepOneData[keyname])));
    stepOneData.fileList.map(i => formData.append("files", i.originFileObj, i.name));
    stepOneData.fileList.map(i => (i.originFileObj === undefined ? formData.append("imgnm", i.name) : ''));

    const isfiles = true;
    this.props.create({ body: formData, id: this.props.id, isfiles }).then((res) => {
      this.setState({ bloading: false });
      this.props.onCancel();
      this.props.refresh();
    });
  }

  render() {
    const {
      selected, unselected, loading, bloading,
    } = this.state;

    return (
      <Row style={{ width: '100%', marginTop: 25 }}>
        {
          !loading ? (
            <Transfer
              showSearch
              titles={['Сонгогдоогүй бараа', 'Сонгогдсон бараа']}
              dataSource={unselected}
              listStyle={{
                width: '47%',
                height: 500,
              }}
              targetKeys={selected}
              onChange={this.handleChange}
              render={item => `${item.skucd} - ${item.skunm} - ${item.catnm}`}
              filterOption={(inputValue, option) => option.catnm.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1 || option.skunm.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1 || option.skucd.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
            />
          ) : (
            <div style={{ marginLeft: '49%', paddingTop: '15%', paddingBottom: '15%' }}><Spin /></div>
          )
        }

        <div className={styles.stepSaveBtn}>
          <Button type="primary" onClick={this.props.handleSave} loading={bloading} >Хадгалах</Button>
        </div>
      </Row>
    );
  }
}

export default Form.create({ name: "product" })(Component);

// const columns = [
//   {
//     title: "Барааны код",
//     dataIndex: "skucd",
//     key: "skucd",
//   },
//   {
//     title: "Барааны нэр",
//     dataIndex: "skunm",
//     key: "skunm",
//   },
//   {
//     title: "Ангилал",
//     dataIndex: "catnm",
//     key: "catnm",
//   },
//   {
//     title: "Бренд",
//     dataIndex: "brandnm",
//     key: "brandnm",
//   },
// ];

// class Component extends React.Component {
//   state = {
//     unselected: [],
//     selected: [],
//     loading: true,
//     selectedRowsLeft: [], // хүснэгтийн checked хийгдсэн мөрүүдийг хадгална
//     selectedRowsRight: [], // хүснэгтийн checked хийгдсэн мөрүүдийг хадгална
//     isLeft: true, // > сонгох товч идэвхитэй эсэх
//     isRight: true, // < буцаах товч идэвхитэй эсэх
//   };

//   componentWillMount() {
//     this.props
//       .getData({ id: this.props.id })
//       .then(res =>
//         this.setState({
//           loading: false,
//           unselected: this.props.response.data,
//         }),
//       );
//   }

//   renderSelectTable = () => {
//     try {
//       const { selected, loading } = this.state;

//       const rowSelection = {
//         onChange: (selectedRowKeys, selectedRowsRight) => {
//           // eslint-disable-next-line no-unused-expressions
//           selectedRowsRight.length === 0
//             ? this.setState({ isRight: true, selectedRowsRight })
//             : this.setState({ isRight: false, selectedRowsRight });
//         },
//       };

//       return (
//         <div className={styles.standardTable}>
//           <Table
//             size="small"
//             title={() => `Сонгогдсон бараа: ${selected.length}`}
//             locale={{ emptyText: "Сонгогдсон бараа байхгүй байна" }}
//             dataSource={selected}
//             columns={columns}
//             loading={loading}
//             rowKey={record => record.skucd}
//             rowSelection={rowSelection}
//             pagination={false}
//             scroll={{ y: 240 }}
//           />
//         </div>
//       );
//       // eslint-disable-next-line no-unreachable
//     } catch (error) {
//       return error;
//     }
//   };

//   renderUnselectTable = () => {
//     try {
//       const { unselected, loading } = this.state;

//       const rowSelection = {
//         onChange: (selectedRowKeys, selectedRowsLeft) => {
//           // eslint-disable-next-line no-unused-expressions
//           selectedRowsLeft.length === 0
//             ? this.setState({ isLeft: true, selectedRowsLeft })
//             : this.setState({ isLeft: false, selectedRowsLeft });
//         },
//       };

//       return (
//         <div className={styles.standardTable}>
//           <Table
//             size="small"
//             title={() => `Сонгогдоогүй бараа: ${unselected.length}`}
//             locale={{ emptyText: "Сонгогдоогүй бараа байхгүй байна" }}
//             dataSource={unselected}
//             columns={columns}
//             loading={loading}
//             rowKey={record => record.skucd}
//             rowSelection={rowSelection}
//             pagination={false}
//             scroll={{ y: 240 }}
//           />
//         </div>
//       );
//       // eslint-disable-next-line no-unreachable
//     } catch (error) {
//       return error;
//     }
//   };

//   // Сонгогдоогүй бараанаас сонгогдсон барааруу нэмэх үйлдэл
//   handleSelect = () => {
//     const { selectedRowsLeft, unselected, selected } = this.state;
//     this.setState({ loading: true });

//     selectedRowsLeft.map((selectedRow) => {
//       unselected.map((select, index) =>
//         (select.skucd === selectedRow.skucd ? unselected.splice(index, 1) : null),
//       );
//       return selected.push(selectedRow);
//     });

//     this.handleResetFilter();
//     this.setState({
//       selected,
//       unselected,
//       isLeft: true,
//       loading: false,
//     });
//   };

//   // Сонгогдсон бараанаас Сонгогдоогүй барааруу нэмэх үйлдэл
//   handleUnselect = () => {
//     const { selectedRowsRight, unselected, selected } = this.state;
//     this.setState({ loading: true });

//     selectedRowsRight.map((selectedRow) => {
//       selected.map((select, index) =>
//         (select.skucd === selectedRow.skucd ? selected.splice(index, 1) : null),
//       );
//       return unselected.push(selectedRow);
//     });

//     this.handleResetFilter();
//     this.setState({
//       selected,
//       unselected,
//       isRight: true,
//       loading: false,
//     });
//   };

//   renderFilter = () => {
//     try {
//       const { getFieldDecorator } = this.props.form;

//       return (
// <Row>
//   <Form className={styles.otModalForm}>
//     <Col span={8}>
//       <Form.Item label="Барааны нэр болон код" style={{ width: "96%" }}>
//         {getFieldDecorator("skucd", {
//         initialValue: "",
//         rules: [
//           {
//             required: false,
//           },
//         ],
//       })(<Input size={"small"} placeholder="Барааны нэр болон кодоор хайх" />)}
//       </Form.Item>
//     </Col>
//     <Col span={8}>
//       <Form.Item label="Барааны ангилал" style={{ width: "96%" }}>
//         {getFieldDecorator("catid", {
//         initialValue: "",
//         rules: [
//           {
//             required: false,
//           },
//         ],
//       })(<Input size={"small"} placeholder="Барааны ангилалаар хайх" />)}
//       </Form.Item>
//     </Col>
//     <Col span={8}>
//       <Form.Item label="Барааны бренд" style={{ width: "96%" }}>
//         {getFieldDecorator("brandid", {
//         initialValue: "",
//         rules: [
//           {
//             required: false,
//           },
//         ],
//       })(<Input size={"small"} placeholder="Барааны брендээр хайх" />)}
//       </Form.Item>
//     </Col>
//   </Form>
// </Row>
//       );
//       // eslint-disable-next-line no-unreachable
//     } catch (error) {
//       return error;
//     }
//   };

//   handleResetFilter = () => { this.props.form.resetFields(); }

//   render() {
//     const { isLeft, isRight } = this.state;

//     return (
//       <div style={{ width: "100%", marginTop: 20 }}>
//         {this.renderFilter()}

//         <div className="ant-modal-footer">
//           <Button size="small" type="button" onClick={this.handleResetFilter} >{'Цэвэрлэх'}</Button>
//           <Button size="small" htmlType="submit" type="primary" >{'Хайх'}</Button>
//         </div>

//         <Row>
//           <Col span={11}>{this.renderUnselectTable()}</Col>

//           <Col span={2} className={styles.btn}>
//             <Button
//               size="small"
//               disabled={isRight}
//               onClick={this.handleUnselect}
//             >
//               <Icon type="left" />
//             </Button>
//             <Button
//               size="small"
//               style={{ marginLeft: "5px" }}
//               onClick={this.handleSelect}
//               disabled={isLeft}
//             >
//               <Icon type="right" />
//             </Button>
//           </Col>
//           <Col span={11}>{this.renderSelectTable()}</Col>

//           <Col span={24}>
//             <div className={styles.submitBtn}>
//               <Button type="primary" htmlType="submit"><Icon type="save" />Хадгалах</Button>
//             </div>
//           </Col>
//         </Row>
//       </div>
//     );
//   }
// }
