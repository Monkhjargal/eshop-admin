import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, List } from 'antd';
import PageHeaderLayout from "../../layouts/PageHeaderLayout";

const mapStateToProps = (state) => {
  const { brands } = state;
  return {
    brands,
  };
};

class GeneralInfoList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  render() {
    return (
      <div style={{ padding: '100px', textAlign: 'center' }}>
        GeneralInfoList
      </div>
    );
  }
}

export default connect(mapStateToProps)(GeneralInfoList);
