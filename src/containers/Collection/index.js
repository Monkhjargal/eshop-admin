import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Package as PackageModel } from "../../models";
import Packagelist from "./list";

const mapStateToProps = (state) => {
  const { auth } = state;
  const {
    data, filter, headers, formcreateByServer,
  } = state.package.all;
  const returnObject = {
    data,
    filter,
    headers,
    formcreateByServer,
    auth,
  };
  return returnObject;
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let actionCreators = {
    getDataSource: PackageModel.all,
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
    this.props.getDataSource({ body: this.state.body });
  }

  render() {
    const { dataSource, auth } = this.state;
    return (
      <Packagelist dataSource={dataSource} getDataSource={this.props.getDataSource} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Collection);
