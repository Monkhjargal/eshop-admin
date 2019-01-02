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

class EhowList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  render() {
    return (
      <div style={{ padding: '100px', textAlign: 'center' }}>
        EhowList
      </div>
    );
  }
}

export default connect(mapStateToProps)(EhowList);
