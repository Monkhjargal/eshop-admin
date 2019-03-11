import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Productlist as ProductModel } from "../../models";
import ProductList from "./list";

const mapStateToProps = (state) => {
  const {
    data, filter, headers, formcreateByServer,
  } = state.productlist.all;

  let returnObject = {
    data,
    filter,
    headers,
    formcreateByServer,
  };

  return returnObject;
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let actionCreators = {
    getDataSource: ProductModel.all,
    getFilterSource: ProductModel.filter,
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
    this.props.getDataSource({ body: this.state.body });
    this.props.getFilterSource();
  }

  render() {
    // console.log(this.state);
    const { dataSource } = this.state;
    return (
      <ProductList dataSource={dataSource} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
