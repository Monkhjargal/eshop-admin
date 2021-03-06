import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Productlist as ProductModel } from "../../models";
import ProductList from "./list";

const mapStateToProps = (state) => {
  // console.log('MAIN PROPS', state);
  const { data, filter, headers } = state.productlist.all;
  const {
    detail, attribute, relational, status, statushistory,
  } = state.productlist;

  let returnObject = {
    data,
    filter,
    headers,
    detail,
    attribute,
    relational,
    status,
    statushistory,
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
    getRelational: ProductModel.relational, // Step 3 -iin product-iig avah huselt
    updateRelational: ProductModel.uprelational, // step 3 update relational product
    getStatusProduct: ProductModel.status, // Baraanii tolov oorchiloh hesgiin tuluv ni oorchilogdoh baraanuud avah husel
    changeProductStatus: ProductModel.changestatus, // Baraanii tuluv oorchiloh huselt
    getStatusHistory: ProductModel.statushistory, // Tuluv oorchiloltiin tuuhiig avah huselt
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

  componentDidMount() { this.props.getFilter(); }

  componentWillReceiveProps(prevProps) {
    // console.log('prevProps', prevProps.relational);
  }

  componentWillUpdate(prevProps, prevState) {
    if (prevProps !== prevState.dataSource) {
      this.setState({ dataSource: prevProps });
    }
  }

  render() {
    return (
      <ProductList
        {...this.props}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
