// import React from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import PropTypes, { element } from 'prop-types';
// import { Transfer, Select, Form, TreeSelect, Col } from 'antd';
// import { Product as ProductModel } from "../../models";

// const treeData = [{
//   title: 'Node1',
//   value: '0-0',
//   key: '0-0',
//   children: [{
//     title: 'Child Node1',
//     value: '0-0-0',
//     key: '0-0-0',
//   }],
// }, {
//   title: 'Node2',
//   value: '0-1',
//   key: '0-1',
//   children: [{
//     title: 'Child Node3',
//     value: '0-1-0',
//     key: '0-1-0',
//   }, {
//     title: 'Child Node4',
//     value: '0-1-1',
//     key: '0-1-1',
//   }, {
//     title: 'Child Node5',
//     value: '0-1-2',
//     key: '0-1-2',
//     children: [{
//       title: 'Hello',
//       value: '0-1-2-0',
//       key: '0-1-2-0',
//     }],
//   }],
// }];

// const mapStateToProps = (state, ownProps) => {
//   const {
//     productfilter: {
//       all: {
//         data, isLoading, pages, total, formcreateByServer, brand, filter,
//       },
//       current: {
//         data: currentData, isLoading: currentIsLoading, error, errorMessage,
//       },
//     },
//   } = state;

//   let returnObject = {
//     data,
//     brand,
//     filter,
//     isLoading,
//     pages,
//     formcreateByServer,
//     total,
//     currentData,
//     currentIsLoading,
//     error,
//     errorMessage,
//   };

//   return returnObject;
// };

// const mapDispatchToProps = (dispatch, ownProps) => {
//   let actionCreators = {
//     getAllData: ProductModel.all,
//     getBrand: ProductModel.brand,
//     getFilterData: ProductModel.filter,
//   };

//   return ({
//     ...bindActionCreators(actionCreators, dispatch),
//   });
// };

// class DataTransfer extends React.Component {
//   state = {
//     mockData: [],
//     targetKeys: [],
//     body: {
//       limit: 20,
//       page: 1,
//       filtered: {},
//       sorted: [],
//     },
//     filter: {
//       catid: ["16"],
//       brandid: ["322"],
//     },
//     value: ['0-0-0'],
//     brand: [],
//     selectedBrand: [],
//     product: [],
//     selectedProduct: [],
//     filterProduct: [],
//   }

//   componentDidMount() {
//     this.props.getAllData({ body: this.state.body }).then(() => {
//       this.setState({ product: this.props.data, selectedProduct: this.props.selectedProduct });
//       this.getMock();
//     });

//     this.props.getBrand({ body: this.state.body }).then(() => {
//       this.setState({ brand: this.props.brand });
//     });
//   }
//   refresh = () => {

//   }

//   isSelectedProduct = (item) => {
//     console.log(this.props.selectedProduct);

//     let isHave = false;
//     this.props.selectedProduct.map((element) => {
//       if (element.toString() === item.toString()) {
//         isHave = true;
//       }
//       return false;
//     });
//     return isHave;
//   }

//   getMock = () => {
//     const { product } = this.state;
//     const targetKeys = [];
//     const mockData = [];
//     product.map((item) => {
//       const data = {
//         key: item.SKUCD,
//         title: `${item.SKUNM}`,
//         description: `${item.CATNM}`,
//         chosen: this.isSelectedProduct(item.SKUCD),
//       };
//       if (data.chosen) {
//         targetKeys.push(data.key);
//       }
//       mockData.push(data);
//       return item;
//     });
//     this.setState({ mockData, targetKeys });
//   }

//   handleChange = (targetKeys, direction, moveKeys) => {
//     let tmp = this.props.selectedProduct;
//     if (direction.toString() === "right") {
//       tmp.push(moveKeys.toString());
//     } else {
//       tmp = tmp.filter(i => i.toString() !== moveKeys.toString());
//     }
//     this.props.onChange(tmp);
//     this.setState({ targetKeys, selectedProduct: tmp });
//   }

//   renderItem = (item) => {
//     const customLabel = (
//       <span className="custom-item">
//         {item.title} - {item.description}
//       </span>
//     );

//     return {
//       label: customLabel, // for displayed item
//       value: item.title, // for title and filter matching
//     };
//   }

//   onTreeChange = (value) => {
//     this.setState({ value });
//   }

//   onChangeBrand = (selectedBrand) => {
//     const { filter } = this.state;
//     filter.brandid = selectedBrand;
//     this.setState({ selectedBrand, filter });

//     this.props.getFilterData({ body: this.state.filter }).then(() => {
//       // this.setState({ product: this.props.filter });
//       // this.getMock();
//     });
//   }

//   render() {
//     const { brand, selectedBrand } = this.state;
//     const tPropert = {
//       treeData,
//       value: this.state.value,
//       onChange: this.onTreeChange,
//       treeCheckable: true,
//       showCheckedStrategy: TreeSelect.SHOW_PARENT,
//       style: {
//         width: 260,
//       },
//     };
//     const filteredOptions = brand.filter(o => !selectedBrand.includes(o));
//     return (
//       <div>
//         <Form layout="inline" >
//           <Form.Item label="Ангилал: ">
//             <TreeSelect {...tPropert} />
//           </Form.Item>
//           <Form.Item label="Бренд: " style={{ marginLeft: 55 }}>
//             <Select
//               mode="multiple"
//               value={selectedBrand}
//               onChange={this.onChangeBrand}
//               style={{ width: 270 }}
//             >
//               {filteredOptions.map(item => (
//                 <Select.Option key={item.id} value={item.id}>
//                   {item.brandnm}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>
//         </Form>
//         <Transfer
//           showSearch
//           titles={['Сонгогдоогүй бараа', 'Сонгогдсон бараа']}
//           dataSource={this.state.mockData}
//           listStyle={{
//           width: 350,
//           height: 500,
//         }}
//           targetKeys={this.state.targetKeys}
//           onChange={this.handleChange}
//           render={this.renderItem}
//         />
//       </div>
//     );
//   }
// }

// DataTransfer.default = {
//   selectedProduct: [],
//   onChange: undefined,
// };
// DataTransfer.propTypes = {
//   selectedProduct: PropTypes.array.isRequired,
//   onChange: PropTypes.func.isRequired,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(DataTransfer);
