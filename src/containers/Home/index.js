// @flow
import { Chart, Geom, Axis, Tooltip, Guide } from 'bizcharts';
import React, { Component } from 'react';
import { Tabs, Card, Icon, Avatar, Col, Row } from 'antd';
import { connect } from 'react-redux';
import PageHeaderLayout from "../../layouts/PageHeaderLayout";
// import { Chart, Axis, Tooltip, Geom, Coord, Legend, Label } from "bizcharts";
// import PropTypes from 'prop-types';
// import { DataSet } from '@antv/data-set';
// import { ChartModule } from "../../models";

const mapStateToProps = (state) => {
  const {
    chart,
  } = state;
  return {};
};
const { Meta } = Card;
const divStyle = {
  width: '90%',
  overflow: 'hidden',
};

class Home extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <PageHeaderLayout title="Category information" style={divStyle}>
        <div style={{ textAlign: 'center' }}>
          Welcome to Dashboard
        </div>
      </PageHeaderLayout>
    );
  }
}
export default connect(mapStateToProps, {})(Home);

