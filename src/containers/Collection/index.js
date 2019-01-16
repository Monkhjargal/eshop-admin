import React from 'react';
import { connect } from 'react-redux';
import { Button, List, Select } from 'antd';
import Page from '../Exception/500';

const mapStateToProps = (state) => {
  const { brands } = state;
  return {
    brands,
  };
};

class CollectionList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  render() {
    return (
      <Page />
    );
  }
}

export default connect(mapStateToProps)(CollectionList);
