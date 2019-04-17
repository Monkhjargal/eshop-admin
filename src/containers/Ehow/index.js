import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Recipe as RecipeModel } from "../../models";
import RecipeList from "./list";

const mapStateToProps = (state) => {
  const { data, headers } = state.recipe.all;
  const {
    filter, crecipe, stepTwoData, product, stepOne,
  } = state.recipe;

  let returnObject = {
    data,
    headers,
    filter,
    crecipe,
    stepTwoData,
    product,
    stepOne,
  };

  return returnObject;
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let actionCreators = {
    getAll: RecipeModel.all,
    getFilter: RecipeModel.filter,
    createStepOne: RecipeModel.createStepOne,
    delete: RecipeModel.delete,
    getStepTwo: RecipeModel.getStepTwo,
    createStepTwo: RecipeModel.createStepTwo,
    getProduct: RecipeModel.getProduct,
    getStepOne: RecipeModel.getStepOne,
    updateStepOne: RecipeModel.updateStepOne,
    updateProduct: RecipeModel.updateProduct,
  };

  return ({
    ...bindActionCreators(actionCreators, dispatch),
  });
};

class Recipe extends React.Component {
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

  refreshList = () => { this.props.getAll({ body: this.state.body }); }

  refresh = () => {
    this.props.getFilter();
    // this.props.getStepOne({ id: 1 });
  }

  render() {
    // console.log('Product State', this.state);
    const { dataSource } = this.state;
    return (
      <RecipeList
        dataSource={dataSource}
        getAll={this.props.getAll}
        createStepOne={this.props.createStepOne}
        delete={this.props.delete}
        getStepTwo={this.props.getStepTwo}
        createStepTwo={this.props.createStepTwo}
        getProduct={this.props.getProduct}
        getStepOne={this.props.getStepOne}
        updateStepOne={this.props.updateStepOne}
        updateProduct={this.props.updateProduct}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
