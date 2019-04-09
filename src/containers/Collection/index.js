import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Package as PackageModel } from "../../models";
import Packagelist from "./list";

const mapStateToProps = (state) => {
  // console.log('MAIN PROPS: ', state);
  const { data, headers } = state.package.all;
  const {
    product, detail, filter, isupdate,
  } = state.package;
  const returnObject = {
    data,
    headers,
    product,
    detail,
    filter,
    isupdate,
  };
  return returnObject;
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let actionCreators = {
    create: PackageModel.create,
    getAll: PackageModel.all,
    getProduct: PackageModel.product,
    delete: PackageModel.delete,
    getDetail: PackageModel.detail,
    getFilter: PackageModel.filter,
    updatePackage: PackageModel.update,
  };

  return ({
    ...bindActionCreators(actionCreators, dispatch),
  });
};

class Collection extends React.Component {
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
    this.props.getDetail({ id: 1 });
    // this.props.getProduct({ id: 0 });
  }

  render() {
    // console.log('PACKAGE STATE:', this.state);
    const { dataSource } = this.state;
    return (
      <Packagelist
        create={this.props.create}
        dataSource={dataSource}
        refresh={this.props.getAll}
        getProduct={this.props.getProduct}
        getDetail={this.props.getDetail}
        updatePackage={this.props.updatePackage}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Collection);
