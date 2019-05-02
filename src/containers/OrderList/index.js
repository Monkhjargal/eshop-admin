import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Order as OrderModel } from "../../models";
import OrderList from "./list";

const mapStateToProps = (state) => {
  const { data, headers } = state.order.all;
  const { filter, detail, amountHistory } = state.order;
  const returnObject = {
    data,
    headers,
    filter,
    detail,
    amountHistory,
  };

  return returnObject;
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let actionCreators = {
    getAll: OrderModel.all,
    getFilter: OrderModel.filter,
    getDetail: OrderModel.detail,
    addAmount: OrderModel.addAmount,
    getAmountHistory: OrderModel.amountHistory,
    amountApprove: OrderModel.amountApprove,
  };

  return ({
    ...bindActionCreators(actionCreators, dispatch),
  });
};

class Order extends React.Component {
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

  componentWillMount() {
    this.props.getFilter({ body: [] });
  }

  componentWillUpdate(prevProps, prevState) {
    if (prevProps !== prevState.dataSource) {
      this.setState({ dataSource: prevProps });
    }
  }

  render() {
    const { dataSource } = this.state;
    return (
      <OrderList
        dataSource={dataSource}
        {...this.props}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);
