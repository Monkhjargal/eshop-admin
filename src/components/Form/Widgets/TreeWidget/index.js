
import React, { Component } from 'react';
import { Tree } from 'antd';
import PropTypes from 'prop-types';

const { TreeNode } = Tree;

class TreeWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: [],
    };
  }

  onCheck = (checkedKeys, e) => {
    this.props.onChange(checkedKeys);

    let toExpand = [];
    e.checkedNodes.forEach((entry) => {
      if (entry.props.children && entry.props.children.length) { toExpand.push(entry.key); }
    });

    let tempData = [...this.state.expanded, ...toExpand];
    let unique = [...new Set(tempData)];
    this.onExpand(unique, { node: e.node, expanded: true });
  };

  onExpand = (expandedKeys, e) => {
    if (e.expanded) {
      this.setState({ expanded: expandedKeys });
    } else {
      const recursive = (object, array) => {
        array.push(object.key);

        if (!object.children || !object.children.length) {
          return array;
        }

        object.children.forEach((entry) => {
          array = array.concat(recursive(entry, []));
        });
        return array;
      };

      let childrens = [];
      childrens = recursive(e.node.props.dataRef, []);

      let toExpand = [];

      expandedKeys.forEach((entry) => {
        if (childrens.indexOf(entry) === -1) {
          toExpand.push(entry);
        }
      });

      console.log('chi', toExpand, childrens);

      this.setState({ expanded: toExpand });
    }
  }
  renderTreeNodes = data => data.map((item) => {
    if (item.children) {
      return (
        <TreeNode title={item.catnm} key={item.id} dataRef={item} selectable={false}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode dataRef={item} selectable={false} title={item.catnm} key={item.id} {...item} />;
  });

  render() {
    const root = [];
    this.props.schema.options.forEach((entry, index) => {
      if (entry.parentid === 0) {
        entry.children = [];
        root.push(entry);
      }
      root.forEach((ent, ind) => {
        if (ent.id === entry.parentid) {
          // entry.key = `${ind}-`
          ent.children.push(entry);
        }
      });
    });
    console.log(root);
    return (
      <Tree
        checkable
        multiple
        defaultExpandAll
        // expandedKeys={this.state.expanded}
        checkedKeys={this.props.value}
        onCheck={this.onCheck}
        onExpand={this.onExpand}
      >
        {this.renderTreeNodes(root)}
      </Tree>
    );
  }
}

TreeWidget.defaultProps = {
  value: [],
};

TreeWidget.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  schema: PropTypes.shape({
    options: PropTypes.array,
  }).isRequired,
};

export default TreeWidget;

