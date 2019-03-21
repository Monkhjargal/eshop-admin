import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Productlist as ProductModel } from "../../models";
import ProductList from "./list";

const mapStateToProps = (state) => {
  // console.log('Admin main props', state);
  const { data, filter, headers } = state.productlist.all;
  const { detail, attribute } = state.productlist;

  let returnObject = {
    data,
    filter,
    headers,
    detail,
    attribute,
  };

  return returnObject;
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let actionCreators = {
    getAll: ProductModel.all, // product-iin husnegtiin data avah huselt filter deer mun adil hereglej bgaa para-g oorchilood
    getFilter: ProductModel.filter, // filter hesegiin input bolon select, multi select-iin value-g avah huselt
    updateProduct: ProductModel.update, // product detail update hiih
    getDetail: ProductModel.detail, // selected hiigdsen sku cd-iin medeelel avah ZURAG
    getAttribute: ProductModel.attribute, // update hiij bga product-iin attribute-iin burtgeliig avah huselt
    updateAttr: ProductModel.upattribute, // attribute-iig update hiih huselt
  };

  return ({
    ...bindActionCreators(actionCreators, dispatch),
  });
};

class Product extends React.Component {
  state = {
    dataSource: {},
    filterSource: {},
    body: {
      limit: 20,
      page: 1,
      filtered: {},
      sorted: [],
    },
  };

  componentDidMount() { this.refresh(); }

  componentWillUpdate(prevProps, prevState) {
    if (prevProps !== prevState.dataSource) {
      this.setState({ dataSource: prevProps });
    }
  }

  refresh = () => {
    this.props.getAll({ body: this.state.body });
    this.props.getFilter();
    // this.props.getDetail({ skucd: '5000267024004' });
    // this.props.getAttribute({ skucd: '5000267024004' });
  }

  render() {
    // console.log('Product State', this.state);
    const { dataSource } = this.state;
    return (
      <ProductList
        dataSource={dataSource}
        updateProduct={this.props.updateProduct}
        getDetail={this.props.getDetail}
        getDataSource={this.props.getAll}
        getAttribute={this.props.getAttribute}
        updateAttr={this.props.updateAttr}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
