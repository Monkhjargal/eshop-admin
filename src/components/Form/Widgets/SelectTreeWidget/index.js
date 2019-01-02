import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TreeSelect } from 'antd';

const { TreeNode } = TreeSelect;

class SelectTreeWidget extends Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.value === 'number') {
      nextProps.onChange(nextProps.value.toString());
    }
  }
  state = {
    value: undefined,
  }

  onChange = (value) => {
    console.log(value);
    this.setState({ value });
  }

  renderTreeNodes = data => data.map((item) => {
    if (item.children) {
      return (
        <TreeNode title={item.catnm} dataRef={item} key={item.id + 1} selectable={false}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode dataRef={item} title={item.catnm} key={item.id + 1000000} selectable={false} {...item} />;
  });

  render() {
    const root = [];
    // console.log(this.props.schema);
    this.props.schema.options.forEach((entry, index) => {
      const keyIndex = 0;
      if (entry.parentid === 0) {
        entry.children = [];
        // entry.key = `${keyIndex}-${index}`;
        root.push(entry);
      }
      root.forEach((ent, ind) => {
        if (ent.id === entry.parentid) {
          // ent.key = `1-${keyIndex}-${ind}`;
          ent.children.push(entry);
        }
      });
    });
    console.log(root);
    return (
      <TreeSelect
        value={this.state.value}
        showSearch
        size="small"
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeDefaultExpandAll
        onChange={this.onChange}
      >
        {this.renderTreeNodes(root)}
      </TreeSelect>
    );
  }
}

SelectTreeWidget.defaultProps = {
  value: [],
};

SelectTreeWidget.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  schema: PropTypes.shape({
    options: PropTypes.array,
  }).isRequired,
};

export default SelectTreeWidget;
