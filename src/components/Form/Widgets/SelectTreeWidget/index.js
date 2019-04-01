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
      return (
        <TreeNode
          disabled={this.props.isProductdetail === undefined ? false : item.children.length !== 0}
          title={item.parentid === 0 ? <b>{item.catnm}</b> : item.catnm}
          dataRef={item}
          key={item.catnm}
          value={`${item.id}`}
          searchValue={item.catnm}
        >
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode disabled dataRef={item} title={item.parentid === 0 ? <b>{item.catnm}</b> : item.catnm} key={item.id} value={`${item.id}`} {...item} />;
  });

  render() {
    // console.log(this.props);
    const { placholder, size, value } = this.props;
    return (
      <TreeSelect
        value={value}
        showSearch
        size={size === undefined ? 'small' : size}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeDefaultExpandAll
        onChange={value => this.props.onChange(value)}
        placholder={placholder}
        allowClear
        filterTreeNode={(inputValue, treeNode) => treeNode.key.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
      >
        {this.renderTreeNodes(this.props.schema.options)}
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
