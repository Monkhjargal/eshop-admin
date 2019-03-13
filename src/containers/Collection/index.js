import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Steps, Card, Button, Table, Popconfirm, Modal, message } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './styles.less';

const { Step } = Steps;
const divStyle = {
  width: '90%',
  overflow: 'hidden',
};

const dataSource = [
  {
    id: 1,
    description: "瀼㰾⁡牨晥∽瑨灴⼺琯獥⹴ⵥ慭瑲洮⽮㸢㼿㼿㼿㼿㼿⼼㹡⼼㹰਍",
    isenable: 1,
    recipenm: "Шарсан мах",
    featuretxt: "Салахын аргагүй сайхан амттай хоол хийе",
    spice: null,
    ingredient: null,
    madeoflvl: null,
    humancnt: null,
    time: null,
    steps: [],
    skucd: [
      "0008043240063",
      "8690536083640",
      "8717163094921",
    ],
    imgnm: [
      "/Resource/recipeimg/cook2.jpg",
    ],
    insymd: "2019-01-01T16:21:30",
    insemp: "9010011",
    updymd: "2019-01-31T16:21:43",
    updemp: "9012055",
  },
];

const columns = [{
  title: 'id',
  dataIndex: 'id',
  key: 'id',
}, {
  title: 'description',
  dataIndex: 'description',
  key: 'description',
}, {
  title: 'isenable',
  dataIndex: 'isenable',
  key: 'isenable',
}, {
  title: 'recipenm',
  dataIndex: 'recipenm',
  key: 'recipenm',
}, {
  title: 'featuretxt',
  dataIndex: 'featuretxt',
  key: 'featuretxt',
}, {
  title: 'spice',
  dataIndex: 'spice',
  key: 'spice',
}, {
  title: 'ingredient',
  dataIndex: 'ingredient',
  key: 'ingredient',
}, {
  title: 'madeoflvl',
  dataIndex: 'madeoflvl',
  key: 'madeoflvl',
}, {
  title: 'humancnt',
  dataIndex: 'humancnt',
  key: 'humancnt',
}, {
  title: 'time',
  dataIndex: 'time',
  key: 'time',
}, {
  title: 'steps',
  dataIndex: 'steps',
  key: 'steps',
}, {
  title: 'skucd',
  dataIndex: 'skucd',
  key: 'skucd',
}, {
  title: 'imgnm',
  dataIndex: 'imgnm',
  key: 'imgnm',
}, {
  title: 'insymd',
  dataIndex: 'insymd',
  key: 'insymd',
}, {
  title: 'insemp',
  dataIndex: 'insemp',
  key: 'insemp',
}, {
  title: 'updymd',
  dataIndex: 'updymd',
  key: 'updymd',
}, {
  title: 'updemp',
  dataIndex: 'updemp',
  key: 'updemp',
}];

const steps = [{
  title: 'First',
  content: (
    <div>
      <form>
        <input placeholder="hi" />
        <input placeholder="hi" />
        <input placeholder="hi" />
        <input placeholder="hi" />
      </form>
    </div>
  ),
}, {
  title: 'Second',
  content: 'Second-content',
}, {
  title: 'Last',
  content: 'Last-content',
}];


class CollectionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }
  state = {
    selectedId: null,
  };

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  handleRowClass = record => (record.id === this.state.selectedId ? styles.selected : '');
  handleRowClick(record) {
    this.setState({ selectedId: record.id });
  }
  handleRowDoubleClick(record) {
    console.log(record);
  }
  render() {
    const { current } = this.state;
    return (
      <div>
        <PageHeaderLayout title="Category information" style={divStyle}>
          <Card bordered={false}>
            <div className={styles.tableList} style={{ overflow: 'hidden', overflowX: 'auto' }}>
              <div className={styles.standardTable}>
                <div className={styles.tableListOperator}>

                  <Button
                    onClick={() => this.showModal(`${this.props.model}Create`)}
                    size="small"
                    icon="plus"
                    type="primary"
                    className={`${styles.formbutton} ${styles.primary}`}
                  >
                    {`Багц бүртгэх`}
                  </Button>

                  <Button
                    onClick={() => this.showModal(`${this.props.model}Update`)}
                    icon="edit"
                    size="small"
                    type="dashed"
                    disabled={!this.state.selectedId}
                    className={`${styles.formbutton} ${styles.update}`}
                  >
                    {`Багц засах`}
                  </Button>

                  <Popconfirm
                    title="Та устгахдаа итгэлтэй байна уу?"
                    onConfirm={e => this.deleteData(e)}
                    okText="Тийм"
                    cancelText="Үгүй"
                  >
                    <Button
                      className={`${styles.formbutton}, ${styles.delete}`}
                      icon="delete"
                      type="danger"
                      size="small"
                      disabled={!this.state.selectedId}
                    >
                      {`Багц устгах`}
                    </Button>
                  </Popconfirm>

                </div>
                <Table
                  dataSource={dataSource}
                  columns={columns}
                  rowClassName={this.handleRowClass}
                  onRow={record => ({
                    onClick: () => this.handleRowClick(record),
                    onDoubleClick: () => this.handleRowDoubleClick(record),
                  })}
                  size="small"
                  bordered={false}
                  rowKey={record => record.id}
                  pagination
                />
                <Modal
                  title="Багц бүртгэх"
                  visible
                  onOk={this.okCreatePromModal}
                  onCancel={this.cancelCreatePromModal}
                  okText="Бүртгэх"
                  cancelText="Болих"
                  centered
                  width={800}
                >
                  <Steps current={current}>
                    {steps.map(item => <Step key={item.title} title={item.title} />)}
                  </Steps>
                  <div className="steps-content">
                    {steps[current].content}
                  </div>
                  <div className="steps-action">
                    {
                      current < steps.length - 1
                      && <Button type="primary" onClick={() => this.next()}>Next</Button>
                    }
                    {
                      current === steps.length - 1
                      && <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
                    }
                    {
                      current > 0
                      && (
                        <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                          Previous
                        </Button>
                      )
                    }
                  </div>
                </Modal>
              </div>
            </div>
          </Card>
        </PageHeaderLayout>
      </div>
    );
  }
}
CollectionList.propTypes = {};
export default CollectionList;
