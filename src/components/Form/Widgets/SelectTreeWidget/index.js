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
      console.log(item.id);
      return (
        <TreeNode title={item.catnm} dataRef={item} key={item.id + 1} selectable={false} value={`${item.id}`}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode dataRef={item} title={item.catnm} key={item.id + 1000000} selectable={false} value={`${item.id}`} {...item} />;
  });

  render() {
    const treeData1 = [{
      title: 'Node1',
      value: '0-0',
      key: '0-0',
      children: [{
        title: 'Child Node1',
        value: '0-0-1',
        key: '0-0-1',
      }, {
        title: 'Child Node2',
        value: '0-0-2',
        key: '0-0-2',
      }],
    }, {
      title: 'Node2',
      value: '0-1',
      key: '0-1',
    }];

    const root = [];
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
        value={this.state.value}
        showSearch
        size="small"
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeDefaultExpandAll
        onChange={this.onChange}
        treeData={treeData1}
      >
        {/* {this.renderTreeNodes(root)} */}
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
