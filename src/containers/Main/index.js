// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import PropsTypes from "prop-types";
import { Home, Survey, Report, SurveyResult } from '../';
import { Generic } from './../../models';
import NotFound from '../Exception/404';
import { PrivateRoute } from '../../components';

const mapStateToProps = (state) => {
  const { auth } = state;
  const { generic } = state;
  return {
    auth,
    generic,
  };
};

class Main extends Component {
  componentDidMount() {
    // this.props.fetchData();
  }

  render() {
    return (
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        {/* <PrivateRoute path="/survey/edit/:_id" component={Survey} />
        <PrivateRoute path="/survey/result/:_id" component={SurveyResult} />
        <PrivateRoute path="/employee/:_id/report" component={Report} /> */}
        {
          this.props.getRouteData.map(item => (
            <PrivateRoute
              exact={item.exact}
              key={item.realPath}
              path={item.realPath}
              component={item.component || NotFound}
            />
          ))
        }
        <Route component={NotFound} />
      </Switch>
    );
  }
}

Main.propTypes = {
  // fetchData: PropsTypes.func.isRequired,
  getRouteData: PropsTypes.array.isRequired,
  // generic: PropsTypes.object,
};

// Main.defaultProps = {
//   generic: {},
// };

export default withRouter(connect(mapStateToProps)(Main));
