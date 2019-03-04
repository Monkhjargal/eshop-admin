import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Tree } from 'antd';
import { connect } from 'react-redux';
import { Category } from '../../models';
import { List } from '../../components';
import PageHeaderLayout from "../../layouts/PageHeaderLayout";

const { TreeNode } = Tree;
const ButtonGroup = Button.Group;
const divStyle = {
  width: '90%',
  overflow: 'hidden',
};
const val = 'table';
const mapStateToProps = (state) => {
  const { category } = state;
  return {
    category,
  };
};
// const mapStateToProps = state => state.category;

class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: 'table',
      cat: [],
    };
  }
  changeView = (view) => {
    this.setState({ val: view });
  }
  componentDidMount() {
    // console.log('>>>>>>>>>', this.state);
    if (this.props.category && this.props.category.all && this.props.category.all.data) {
      // console.log(this.props.category.all.data);
      this.setState({
        cat: this.props.category.all.data,
      });
    }
  }
  renderTree() { }
  render() {
    return (
      <PageHeaderLayout title="Category information" style={divStyle}>
        <List
          actions={['create', 'update', 'delete']}
          model={'Category'}
          name={'Category'}
          filter
        />
      </PageHeaderLayout>
    );
  }
}
// export default connect(mapStateToProps)(CategoryList);
CategoryList.propTypes = {
  categorylist: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, { categorylist: Category.all })(CategoryList);
