import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination } from 'antd';
import styles from './index.less';

class StandardTable extends PureComponent {
  state = {
    selectedId: null,
  };

  onChange(pageNumber) {
    console.log('Page: ', pageNumber);
  }

  handleRowClass = record => (record.id === this.state.selectedId ? styles.selected : '');

  handleRowClick = (record) => {
    this.setState({ selectedId: record.id });
    this.props.onSelect(record.id);
  }

  render() {
    const {
      data,
      pagination,
      onChange,
      ...rest
    } = this.props;

    let filteredData;

    const renderLocalPagination = (pagination) => {
      const { total, ...rest } = pagination;
      return (
        <Pagination
          size="small"
          showQuickJumper
          showSizeChanger
          onChange={(current, pageSize) => onChange({ current, pageSize }, {}, {})}
          total={data.length}
          {...rest}
        />
      );
    };

    const renderFooter = () => (
      <div className={styles.tableFooter}>
        <div className={styles.footerInfo}>
          Нийт: {pagination.total && data.length !== pagination.total ? pagination.total : data.length}
        </div>
        {/* {
          pagination.total && data.length !== pagination.total ?
            <Pagination
              size="small"
              showSizeChanger
              onChange={(current, pageSize) => onChange({ current, pageSize }, {}, {})}
              showQuickJumper
              {...pagination}
            /> :
            renderLocalPagination(pagination)
        } */}
      </div>
    );

    const paginationOptions = ['10', '20', '30'];

    // if (pagination.total && data.length !== pagination.total) {
    //   filteredData = data;
    // } else {
    //   let offset = (pagination.current || 1) - 1;
    //   offset *= (pagination.pageSize || 20);
    //   const end = offset + (pagination.pageSize || 20);

    //   filteredData = data.filter((entry, index) => {
    //     if (index >= offset && index <= end) { return true; }
    //     return false;
    //   });
    // }

    return (
      <div className={styles.standardTable}>
        <Table
          rowClassName={this.handleRowClass}
          onRow={record => ({
            onClick: () => this.handleRowClick(record),
          })}
          size="small"
          bordered={false}
          rowKey={record => record.id}
          dataSource={data}
          pagination={{ defaultPageSize: 50, showSizeChanger: true, showQuickJumper: true }}
          footer={renderFooter}
          onChange={(p, f, sorted) => onChange({ current: 1, pageSize: pagination.pageSize || 20 }, {}, sorted)}
          {...rest}
        />
      </div>
    );
  }
}

StandardTable.propTypes = {
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  columns: PropTypes.array.isRequired,
  handleTableChange: PropTypes.func,
  pagination: PropTypes.object,
  scroll: PropTypes.object,
};

StandardTable.defaultProps = {
  onSelect: undefined,
  onChange: undefined,
  handleTableChange: undefined,
  pagination: {},
  scroll: {},
};

export default StandardTable;
