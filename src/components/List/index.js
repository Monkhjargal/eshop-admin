import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Models from '../../models';
import ListComponent from './list';

String.prototype.unCapitalize = function unCapitalize() {
  return this.charAt(0).toLowerCase() + this.slice(1);
};

const mapStateToProps = (state, ownProps) => {
  // console.log(state);
  const {
    [ownProps.model.unCapitalize()]: {
      all: {
        data, isLoading, pages, headers, total, formcreateByServer,
      },
      current: {
        data: currentData, isLoading: currentIsLoading, error, errorMessage,
      },
    },
    form: {
      forms: {
        [`${ownProps.model}/post`]: createForm,
        [`${ownProps.model}/put`]: updateForm,
      },
      isLoading: formIsLoading,
    },
    filter: {
      filters: {
        [ownProps.model]: filterForm,
      },
      isLoading: filterIsLoading,
    },
  } = state;

  let returnObject = {
    data,
    isLoading,
    pages,
    headers,
    formcreateByServer,
    total,
    currentData,
    currentIsLoading,
    createForm,
    updateForm,
    formIsLoading,
    filterForm,
    filterIsLoading,
    error,
    errorMessage,
  };

  if (ownProps.addons && ownProps.addons.length) {
    let addonsArray = [];
    ownProps.addons.forEach((entry, index) => {
      addonsArray[index] = {};
      addonsArray[index].data = state[entry.model.unCapitalize()].current.data;
      addonsArray[index].isLoading = state[entry.model.unCapitalize()].current.isLoading;
      addonsArray[index].error = state[entry.model.unCapitalize()].current.error;
      addonsArray[index].errorMessage = state[entry.model.unCapitalize()].current.errorMessage;
      addonsArray[index].form = state.form.forms[`${entry.model}/put`];
      addonsArray[index].name = entry.name;
      addonsArray[index].model = entry.model;
    });
    returnObject.addonsArray = addonsArray;
  }

  return returnObject;
};

const mapDispatchToProps = (dispatch, ownProps) => {
  // console.log(Models[ownProps.model]);
  let actionCreators = {
    fetchForm: Models.Form.get,
    fetchFilter: Models.Filter.get,
    getAllData: Models[ownProps.model].all,
    getData: Models[ownProps.model].get,
    createData: Models[ownProps.model].create,
    updateData: Models[ownProps.model].update,
    deleteData: Models[ownProps.model].delete,
  };

  if (ownProps.addons && ownProps.addons.length) {
    ownProps.addons.forEach((entry, index) => {
      actionCreators[`addons${index}get`] = Models[entry.model].get;
      actionCreators[`addons${index}update`] = Models[entry.model].update;
    });
  }

  return ({
    ...bindActionCreators(actionCreators, dispatch),
  });
};

// const List = props => (props.list ?
//   props.list(props) :
//   <ListComponent {...props} />);

class List extends React.Component {
  state = {
    dataSource: {},
  }

  componentWillUpdate(prevProps, prevState) {
    if (prevProps !== prevState.dataSource) {
      this.setState({ dataSource: prevProps });
    }
  }

  render() {
    // console.log(this.props);
    return <ListComponent {...this.props} />;
  }
}


List.propTypes = {
  list: PropTypes.func,
  actions: PropTypes.array.isRequired,
};

List.defaultProps = {
  list: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
