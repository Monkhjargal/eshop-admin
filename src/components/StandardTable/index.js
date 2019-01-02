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
    console.log(record.id);
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
        {pagination.total && data.length !== pagination.total ?
          <Pagination size="small" onChange={(current, pageSize) => onChange({ current, pageSize }, {}, {})} showQuickJumper {...pagination} /> :
          renderLocalPagination(pagination)
        }
      </div>
    );

    if (pagination.total && data.length !== pagination.total) {
      filteredData = data;
    } else {
      let offset = (pagination.current || 1) - 1;
      offset *= (pagination.pageSize || 10);
      const end = offset + (pagination.pageSize || 10);

      filteredData = data.filter((entry, index) => {
        if (index >= offset && index <= end) { return true; }
        return false;
      });
    }

    return (
      <div className={styles.standardTable}>
        <Table
          rowClassName={this.handleRowClass}
          onRow={record => ({
            onClick: () => this.handleRowClick(record),
          })}
          bordered
          rowKey={record => record.id}
          dataSource={filteredData}
          pagination={false}
          footer={renderFooter}
          onChange={(p, f, sorted) => onChange({ current: 1, pageSize: pagination.pageSize || 10 }, {}, sorted)}
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
