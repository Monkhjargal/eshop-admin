import React from 'react';
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
  const { cat } = state;
  return {
    cat,
  };
};

class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: 'table',
    };
  }
  changeView = (view) => {
    this.setState({ val: view });
  }
  componentDidMount() {
    console.log(this.props);
    this.props.all();
  }
  render() {
    console.log(this.props);
    return (
      <PageHeaderLayout title="Category information" style={divStyle}>
        <div>
          <ButtonGroup>
            <Button type="primary" icon="bars" onClick={() => this.changeView('table')} />
            <Button type="primary" icon="appstore" onClick={() => this.changeView('tree')} />
          </ButtonGroup>
          {
            this.state.val === 'table' ? (
              <List
                actions={['create', 'update', 'delete']}
                model={'Category'}
                name={'Category'}
                filter
              />
            ) : (
              <div>
                <Tree
                  showLine
                  defaultExpandedKeys={['0-0-0']}
                  onSelect={this.onSelect}
                >
                  <TreeNode title="parent 1" key="0-0">
                    <TreeNode title="parent 1-0" key="0-0-0">
                      <TreeNode title="leaf" key="0-0-0-0" />
                      <TreeNode title="leaf" key="0-0-0-1" />
                      <TreeNode title="leaf" key="0-0-0-2" />
                    </TreeNode>
                    <TreeNode title="parent 1-1" key="0-0-1">
                      <TreeNode title="leaf" key="0-0-1-0" />
                    </TreeNode>
                    <TreeNode title="parent 1-2" key="0-0-2">
                      <TreeNode title="leaf" key="0-0-2-0" />
                      <TreeNode title="leaf" key="0-0-2-1" />
                    </TreeNode>
                  </TreeNode>
                </Tree>
              </div>
            )
          }
        </div>
      </PageHeaderLayout>
    );
  }
}
export default connect(mapStateToProps, { all: Category.all })(CategoryList);

// export default () => ();
