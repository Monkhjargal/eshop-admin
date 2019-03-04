import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TreeSelect } from 'antd';

const { TreeNode } = TreeSelect;

class SelectTreeWidget extends Component {
  constructor(props) {
    super(props);
  }
  // componentWillReceiveProps(nextProps) {
  //   if (typeof nextProps.value === 'number') {
  //     nextProps.onChange(nextProps.value.toString());
  //   }
  // }

  state = {
    value: undefined,
  }

  onChange = (value) => {
    // console.log('click');
    this.setState({ value });
  }

  renderTreeNodes = data => data.map((item) => {
    if (item.children) {
      // console.log(item.id);
      return (
        <TreeNode title={item.catnm} dataRef={item} key={item.id} value={`${item.id}`}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode dataRef={item} title={item.catnm} key={item.id} value={`${item.id}`} {...item} />;
  });

  render() {
    const root = [];
    // console.log(this.props.schema.options);
    this.props.schema.options.forEach((entry, index) => {
      if (entry.parentid === 0) {
        entry.children = [];
        root.push(entry);
      }
      root.forEach((ent, ind) => {
        if (ent.id === entry.parentid) {
          ent.children.push(entry);
        }
      });
    });
    // console.log(root);
    return (
      <TreeSelect
        value={this.props.value}
        showSearch
        size="small"
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeDefaultExpandAll
        onChange={value => this.props.onChange(value)}
      >
        {this.renderTreeNodes(root)}
      </TreeSelect>
    );
  }
}

SelectTreeWidget.defaultProps = {
  value: undefined,
};

SelectTreeWidget.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  schema: PropTypes.shape({
    options: PropTypes.array,
  }).isRequired,
};

export default SelectTreeWidget;
