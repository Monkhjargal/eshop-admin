// @flow
import { Chart, Axis, Tooltip, Geom, Coord, Legend, Label } from "bizcharts";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DataSet } from '@antv/data-set';
import { Tabs } from 'antd';
import { connect } from 'react-redux';
import { ChartModule } from "../../models";

const mapStateToProps = (state) => {
  const {
    chart,
  } = state;
  return {
    // professionsArray: chart.professions,
    // awardsArray: chart.awards,
    // sectionsArray: chart.sections,
    // gendersArray: chart.genders,
    // apartmentsArray: chart.apartments,
    // workdatesArray: chart.workdates,
    // companysArray: chart.companys,
  };
};
const { TabPane } = Tabs;

class Home extends Component {
  componentDidMount() {
    // this.props.professions();
    // this.props.sections();
    // this.props.genders();
    // this.props.apartments();
    // this.props.workdates();
    // this.props.companys();
  }
  render() {
    // const { DataView } = DataSet;
    // if (this.props.professionsArray
    //   && this.props.sectionsArray
    //   && this.props.gendersArray
    //   && this.props.apartmentsArray
    //   && this.props.workdatesArray
    //   && this.props.companysArray) {
    //   const professionDv = new DataView();
    //   const sectionDv = new DataView();
    //   const genderDv = new DataView();
    //   const apartmentDv = new DataView();
    //   const workdateDv = new DataView();
    //   const companyDv = new DataView();
    //   companyDv.source(this.props.companysArray || []).transform({
    //     type: 'percent',
    //     field: 'count',
    //     dimension: 'name',
    //     as: 'percent',
    //   });
    //   workdateDv.source(this.props.workdatesArray || []).transform({
    //     type: 'percent',
    //     field: 'count',
    //     dimension: 'name',
    //     as: 'percent',
    //   });
    //   genderDv.source(this.props.gendersArray || []).transform({
    //     type: 'percent',
    //     field: 'count',
    //     dimension: 'name',
    //     as: 'percent',
    //   });
    //   apartmentDv.source(this.props.apartmentsArray || []).transform({
    //     type: 'percent',
    //     field: 'count',
    //     dimension: 'name',
    //     as: 'percent',
    //   });
    //   professionDv.source(this.props.professionsArray || []).transform({
    //     type: 'percent',
    //     field: 'count',
    //     dimension: 'name',
    //     as: 'percent',
    //   });
    //   sectionDv.source(this.props.sectionsArray || []).transform({
    //     type: 'percent',
    //     field: 'count',
    //     dimension: 'name',
    //     as: 'percent',
    //   });
    //   const cols = {
    //     percent: {
    //       formatter: (val) => {
    //         val = `${(val * 100).toFixed(2)}%`;
    //         return val;
    //       },
    //     },
    //   };
    return (
      <div style={{ padding: '100px', textAlign: 'center' }}>
          Dashboard
      </div>
    );
    // }
    // return (<div>Loading...</div>);
  }
}

// Home.defaultProps = {
//   professionsArray: [],
//   sectionsArray: [],
//   gendersArray: [],
//   apartmentsArray: [],
//   workdatesArray: [],
//   companysArray: [],
// };

// Home.propTypes = {
//   professionsArray: PropTypes.array,
//   sectionsArray: PropTypes.array,
//   gendersArray: PropTypes.array,
//   apartmentsArray: PropTypes.array,
//   workdatesArray: PropTypes.array,
//   companysArray: PropTypes.array,
//   professions: PropTypes.func.isRequired,
//   sections: PropTypes.func.isRequired,
//   awards: PropTypes.func.isRequired,
//   genders: PropTypes.func.isRequired,
//   apartments: PropTypes.func.isRequired,
//   workdates: PropTypes.func.isRequired,
//   companys: PropTypes.func.isRequired,
// };
export default connect(mapStateToProps, {
  // professions: ChartModule.professions,
  // sections: ChartModule.sections,
  // genders: ChartModule.genders,
  // apartments: ChartModule.apartments,
  // workdates: ChartModule.workdates,
  // companys: ChartModule.companys,
})(Home);

