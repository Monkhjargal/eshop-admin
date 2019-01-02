import React, { Component } from 'react';
import { Table, Input } from 'antd';
import PropTypes from 'prop-types';
import styles from './index.less';

class TimeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }

  handleClick = (hallId, dayId, timeId) => {
    // console.log('Clicked!!!');
    if (this.props.onClick) {
      this.props.onClick({ hallId, dayId, timeId });
    }
  }

  handleSearchChange = (event) => {
    this.setState({
      search: event.target.value,
    });
  }

  renderTimeCol = (text, data, day) => (
    <div className={styles.innerTable}>
      <ul>
        {
          this.props.generic.times.map(part => (
            <li onClick={() => { this.handleClick(data._id, day._id, part._id); }} key={part._id}>
              <div className={styles.label}>{part.name}</div>
              {this.props.indexedByItemData[data._id] && this.props.indexedByItemData[data._id][day._id] && this.props.indexedByItemData[data._id][day._id][part._id] && this.props.indexedByItemData[data._id][day._id][part._id].length &&
                <div className={styles.partContent}>
                  <div className={styles.partTeacher}>
                    {
                      this.props.generic.formattedTeachers[this.props.indexedByItemData[data._id][day._id][part._id][0].teacher] &&
                      this.props.generic.formattedTeachers[this.props.indexedByItemData[data._id][day._id][part._id][0].teacher].full_name
                    }
                  </div>
                  <div className={styles.partLesson}>
                    {
                      this.props.generic.formattedLessons[this.props.indexedByItemData[data._id][day._id][part._id][0].lesson] &&
                      this.props.generic.formattedLessons[this.props.indexedByItemData[data._id][day._id][part._id][0].lesson].general.full_name
                    }
                  </div>
                </div>
              }

              {/* { data && data[part._id] ?
                <div className={styles.partContent}>
                  <div className={styles.partTeacher}>
                    {
                      this.props.generic.formattedTeachers[data[part._id].teacher] &&
                      this.props.generic.formattedTeachers[data[part._id].teacher].full_name
                    }
                  </div>
                  <div className={styles.partLesson}>
                    {
                      this.props.generic.formattedLessons[data[part._id].lesson] &&
                      this.props.generic.formattedLessons[data[part._id].lesson].general.full_name
                    }
                  </div>
                </div> : null
              } */}
            </li>
          ))
        }
      </ul>
    </div>
  )


  renderFirstCol = () => ({
    title: 'Анги/Танхим',
    width: 170,
    dataIndex: 'hall',
    key: 'hall',
    fixed: 'left',
    render: (text, record) => (
      <div className={styles.hallBox}>
        {
          this.props.generic.formattedUniversities &&
          <div className={styles.university}>
            {`${this.props.generic.formattedUniversities[record.university]}`}
          </div>
        }
        <div className="classNum">{`${record.name}`}</div>
        <div className="size">{`(${record.size})`}</div>
      </div>
    ),
  });

  renderWeekCol = () => this.props.generic.days.map(day => Object.assign({}, day, {
    key: day._id,
    title: day.name,
    dataIndex: day._id,
    className: styles.weekOfDay,
    render: (text, data) => this.renderTimeCol(text, data, day),
  }));

  render() {
    let sortedData = JSON.parse(JSON.stringify(this.props.data));
    sortedData = sortedData.sort((a, b) => ((b.university === this.props.university) - (a.university === this.props.university)) || (a.university.localeCompare(this.props.university)) || a.name.localeCompare(b.name));

    return (
      <div className={styles.scheduler}>
        <Input
          className={styles.search}
          placeholder="Өрөө хайх"
          value={this.state.search}
          onChange={this.handleSearchChange}
        />
        <Table
          columns={[this.renderFirstCol(), ...this.renderWeekCol()]}
          dataSource={sortedData.filter(entry => entry.name.indexOf(this.state.search) !== -1)}
          bordered
          rowKey={val => val._id}
          onChange={this.handleTableChange}
          scroll={{ x: 1300 }}
          pagination={{
            showSizeChanger: true,
          }}
        />
      </div>
    );
  }
}

TimeTable.defaultProps = {
  // times: [],
  // generic: {},
  data: [],
  university: '',
  indexedByItemData: {},
  onClick: undefined,
  // days: [],
  // search: '',
};

TimeTable.propTypes = {
  // times: PropTypes.array,
  generic: PropTypes.object.isRequired,
  university: PropTypes.string,
  data: PropTypes.array,
  indexedByItemData: PropTypes.object,
  onClick: PropTypes.func,
  // handleSearchChange: PropTypes.func.isRequired,
  // days: PropTypes.days,
  // search: PropTypes.string.isRequired,
};

export default TimeTable;
