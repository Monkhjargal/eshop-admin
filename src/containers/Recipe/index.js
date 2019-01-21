import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Card, Modal, Button, Icon, Steps, Transfer, message } from "antd";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import ModalLayout from "../../layouts/ModalLayout";
import { StandardTable } from '../../components';
import { Recipe as RecipeModel } from "../../models";
import MultiUploadWidget from '../../components/Form/Widgets/MultiUploadWidget';

import style from './style.less';

const RecipeColumns = [
  {
    title: "ID",
    dataIndex: "id",
    defaultSortOrder: "ascend",
    sorter: (a, b) => a > b,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Жорын нэр",
    dataIndex: "recipenm",
    defaultSortOrder: "ascend",
    sorter: (a, b) => a.recipenm.length - b.recipenm.length,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Тайлбар",
    dataIndex: "description",
    defaultSortOrder: "ascend",
    sorter: (a, b) => a.description.length - b.description.length,
    sortDirections: ["descend", "ascend"],
  },
  // {
  //   title: "Зураг",
  //   dataIndex: "imgnm",
  // },
];

class Recipe extends React.Component {
  state = {
    currentStep: 0,
    recipeContent: '',
    recipeModalVisible: false,
    recipeSelectedId: null,
    body: {
      limit: 20,
      page: 1,
      filtered: {},
      sorted: [],
    },
    productModalVisible: false,
    transferMockData: [],
    transferTargetKeys: [],
  };

  getTransferMock = () => {
    const targetKeys = [];
    const mockData = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        chosen: Math.random() * 2 > 1,
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    this.setState({
      transferMockData: mockData,
      transferTargetKeys: targetKeys,
    });
  }

  handleTransferChange = (targetKeys) => {
    this.setState({ transferTargetKeys: targetKeys });
  }

  renderTransferFooter = () => (
    <Button
      size="small"
      style={{ float: 'right', margin: 5 }}
      onClick={this.getTransferMock}
    >
        Сэргээх
    </Button>
  )

  componentDidMount() {
    this.getTransferMock();
    this.refresh();
  }

  handleTableChange = ({ currentStep, pageSize }, filters, sorter) => {
    this.setState({
      body: {
        ...this.state.body,
        page: currentStep,
        limit: pageSize,
        sorted: [{
          id: sorter.field,
          desc: sorter.order !== 'ascend',
        }],
      },
    }, () => this.refresh());
  }

  showRecipeModal = (modal) => {
    this.setState({
      recipeModalVisible: modal,
    });
  }

  handleRecipeModalCancel = (callback) => {
    const cb = typeof callback === 'function' ? callback : null;
    this.setState({
      recipeModalVisible: true,
    }, cb);
  }

  handleRecipeSelect = (recipeSelectedId) => {
    this.setState({
      recipeSelectedId,
    });
  }

  afterRecipeSubmit = () => {
    this.handleRecipeModalCancel(() => {
      this.refresh();
    });
  }

  refresh = () => {
    this.props.getAllData({ body: this.state.body, url: this.props.url });
  }

  deleteData = () => {
    if (this.state.recipeSelectedId) {
      let requestObject = { _id: this.state.recipeSelectedId };
      if (this.props.url) {
        requestObject = { ...requestObject, url: this.props.url };
      }
      this.props.deleteData(requestObject).then(() => {
        this.refresh();
      });
    }
  }

  next() {
    const currentStep = this.state.currentStep + 1;
    this.setState({ currentStep });
  }

  prev() {
    const currentStep = this.state.currentStep - 1;
    this.setState({ currentStep });
  }

  handleStepsFinish = () => {
    message.success('Амжилттай дууслаа!');
  };

  handleRecipeContentChange = (value) => {
    this.setState({ recipeContent: value });
  }

  handleProductModalVisibilityToggle = () => {
    this.setState({ productModalVisible: !this.state.productModalVisible });
  };

  modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
  ];

  render() {
    // this.props.data.forEach((entry, index) => {
    //   if (entry.imgnm && entry.imgnm.length > 0) {
    //     const imgServer = 'http://202.55.180.200:8877/';
    //     entry.render = (url = entry.imgnm[0]) => <img src={imgServer + url} alt={url} width="100px" />;
    //   }
    // });

    console.log('in render', this.props);

    const steps = [{
      title: 'Алхам 1',
      content: (
        <div style={{ padding: '20px 0' }}>
          <div className="images-upload">
            <h4>Зураг</h4>
            <MultiUploadWidget />
          </div>

          <h4>Агуулга</h4>
          <div style={{ paddingTop: '10px' }}>
            <ReactQuill
              theme="snow"
              value={this.state.recipeContent}
              modules={this.modules}
              formats={this.formats}
              onChange={this.handleRecipeContentChange}
            />
          </div>
        </div>
      ),
    }, {
      title: 'Алхам 2',
      content: (
        <div style={{ margin: "20px 0" }}>
          <Button
            icon="plus"
            type="primary"
            onClick={this.handleProductModalVisibilityToggle}
          >
            {'Бараа нэмэх'}
          </Button>
          <StandardTable
            bordered
            onSelect={this.handleRecipeSelect}
            onChange={this.handleTableChange}
            columns={[{
              title: "Зураг",
            }, {
              title: "Барааны код",
            }, {
              title: "Барааны нэр",
            }]}
            data={[]}
            loading={this.props.isLoading}
            pagination={{
              total: this.props.total,
              step: this.state.body.page,
              pageSize: this.state.body.limit,
              showSizeChanger: true,
            }}
            scroll={{ x: this.props.scroll }}
            style={{ marginTop: "20px" }}
          />
          <Modal
            title={'Бараа сонгох цонх'}
            width={'70%'}
            visible={this.state.productModalVisible}
            footer={false}
            className={style.otModalSteps}
            maskClosable={false}
            onCancel={this.handleProductModalVisibilityToggle}
          >
            <ModalLayout>
              <Transfer
                dataSource={this.state.transferMockData}
                titles={['Бүх бараа', 'Сонгосон бараа']}
                showSearch
                listStyle={{
                  width: '40%',
                  height: 300,
                }}
                operations={['Бараа сонгох', 'Бараа буцаах']}
                targetKeys={this.state.transferTargetKeys}
                onChange={this.handleTransferChange}
                render={item => `${item.title}-${item.description}`}
                footer={this.renderTransferFooter}
                style={{ marginBottom: '20px' }}
              />
              <Button
                icon="double-left"
                onClick={this.handleProductModalVisibilityToggle}
              >
                {'Цуцлах'}
              </Button>
              <Button
                icon="save"
                type="primary"
                style={{ marginLeft: 8 }}
                // onClick={() => this.showRecipeModal('RecipeCreate')}
              >
                {'Хадгалах'}
              </Button>
            </ModalLayout>
          </Modal>
        </div>
      ),
    }];

    const { Step } = Steps;
    const { currentStep } = this.state;

    return (
      <Card>
        <div className={style.tableList} style={{ overflow: 'hidden', overflowX: 'auto' }}>
          <div className={style.tableListOperator}>
            <Button
              icon="plus"
              type="primary"
              onClick={() => this.showRecipeModal('RecipeCreate')}
            >
              {'Хоолны жор бүртгэх'}
            </Button>
          </div>
          <StandardTable
            bordered
            onSelect={this.handleRecipeSelect}
            onChange={this.handleTableChange}
            columns={RecipeColumns}
            data={this.props.data}
            loading={this.props.isLoading}
            pagination={{
              total: this.props.total,
              step: this.state.body.page,
              pageSize: this.state.body.limit,
              showSizeChanger: true,
            }}
            scroll={{ x: this.props.scroll }}
          />
        </div>
        <Modal
          title={'Жор сонгох цонх'}
          width={'70%'}
          visible={this.state.recipeModalVisible === 'RecipeCreate'}
          footer={false}
          className={style.otModalSteps}
          maskClosable={false}
          onCancel={this.handleRecipeModalCancel}
        >
          <ModalLayout>
            <Steps current={currentStep}>
              {steps.map(item => <Step key={item.title} title={item.title} />)}
            </Steps>
            <div className={style.stepsContent}>{steps[currentStep].content}</div>
            <div className={style.stepsAction}>
              {
                currentStep < steps.length - 1
                && <Button onClick={() => this.next()}>Цааш <Icon type="double-right" /></Button>
              }
              {
                currentStep > 0
                && <Button onClick={() => this.prev()}><Icon type="double-left" /> Өмнөх</Button>
              }
              {
                currentStep === steps.length - 1
                && <Button style={{ marginLeft: 8 }} icon="save" type="primary" onClick={this.handleStepsFinish}>Хадгалах</Button>
              }
            </div>
          </ModalLayout>
        </Modal>
      </Card>
    );
  }
}

Recipe.propTypes = {
  getAllData: PropTypes.func.isRequired,
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  total: PropTypes.number,
  // end of list props

  // filter: PropTypes.bool,
  scroll: PropTypes.number,
  addonsArray: PropTypes.array,
  name: PropTypes.string,
  url: PropTypes.string,
  actions: PropTypes.array,
  // customAddons: PropTypes.array,
  // end of component props

  // fetchForm: PropTypes.func.isRequired,
  formIsLoading: PropTypes.bool,
  // end of form props

  // fetchFilter: PropTypes.func.isRequired,
  // filterIsLoading: PropTypes.bool,
  // filterForm: PropTypes.object,
  // // end of filter props

  createData: PropTypes.func.isRequired,
  updateData: PropTypes.func.isRequired,
  deleteData: PropTypes.func.isRequired,
  // createForm: PropTypes.object,
  // updateForm: PropTypes.object,
  getData: PropTypes.func.isRequired,
  dataIsLoading: PropTypes.bool,
  currentData: PropTypes.object,
  // end of create update props

  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  steps: PropTypes.array,
};

Recipe.defaultProps = {
  data: [],
  isLoading: false,
  total: 0,
  // end of list props

  // filter: false,
  scroll: undefined,
  addonsArray: [],
  name: '',
  url: undefined,
  actions: [],
  // customAddons: [],
  // end of component props

  formIsLoading: false,
  // end of form props

  // filterIsLoading: false,
  // filterForm: {},
  // // end of filter props

  // createForm: {},
  // updateForm: {},
  dataIsLoading: false,
  currentData: {},

  error: false,
  errorMessage: '',
  steps: [],
};

const mapStateToProps = (state, ownProps) => {
  console.log('Recipe => mapStateToProps', state);

  const {
    recipe: {
      all: {
        data, isLoading, pages, total, formcreateByServer,
      },
      current: {
        data: currentData, isLoading: currentIsLoading, error, errorMessage,
      },
    },
    form: {
      forms: {
        'recipe/post': createForm,
        'recipe/put': updateForm,
      },
      isLoading: formIsLoading,
    },
    // productData: {
    //   product: { data },
    // },
  } = state;

  let returnObject = {
    data,
    isLoading,
    pages,
    formcreateByServer,
    total,
    currentData,
    currentIsLoading,
    createForm,
    updateForm,
    formIsLoading,
    error,
    errorMessage,
  };

  return returnObject;
};

const mapDispatchToProps = (dispatch) => {
  let actionCreators = {
    getAllData: RecipeModel.all,
    getData: RecipeModel.get,
    createData: RecipeModel.create,
    updateData: RecipeModel.update,
    deleteData: RecipeModel.delete,
  };

  return ({
    ...bindActionCreators(actionCreators, dispatch),
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Recipe);
