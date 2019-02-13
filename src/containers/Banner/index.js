import React from 'react';
import { List } from '../../components';
import PageHeaderLayout from "../../layouts/PageHeaderLayout";

const divStyle = {
  width: '90%',
};

export default () => (
  <PageHeaderLayout title="List information" style={divStyle}>
    <List
      actions={['create', 'update', 'delete']}
      model={'Banner'}
      name={'Banner'}
      filter
    />
  </PageHeaderLayout>
);


// import React from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { Button, Modal, List, Divider, Table, Popconfirm, Switch, Icon, Form, Input, Tooltip, Cascader, Select, Row, Col, Checkbox, AutoComplete } from 'antd';
// // import { List } from '../../components';
// import { Banner } from '../../models';
// import styles from './styles.less';

// const FormItem = Form.Item;

// const mapStateToProps = (state) => {
//   const { banner } = state;
//   return {
//     banner,
//   };
// };

// class BannerList extends React.Component {
//   constructor(props) {
//     super(props);
//     this.columns = [{
//       title: 'Image',
//       dataIndex: 'imgnm',
//       key: 'imgnm',
//       render: text => (
//         <div>
//           <img src={`http://202.55.180.200:8877/${text}`} alt="bannerimg" width="100px" />
//         </div>
//       ),
//     }, {
//       title: 'Banner Name',
//       dataIndex: 'bannernm',
//       key: 'bannernm',
//     }, {
//       title: 'Description',
//       dataIndex: 'btntext',
//       key: 'btntext',
//     }, {
//       title: 'Enable',
//       dataIndex: 'isenable',
//       key: 'isenable',
//       render: (text, record) => (
//         <span>
//           <Switch defaultChecked />
//         </span>
//       ),
//     }, {
//       title: 'Type',
//       dataIndex: 'bannertypeid',
//       key: 'bannertypeid',
//     }, {
//       title: 'Start Date',
//       dataIndex: 'sdate',
//       key: 'sdate',
//     }, {
//       title: 'End Date',
//       dataIndex: 'edate',
//       key: 'edate',
//     }, {
//       title: 'lngcd',
//       dataIndex: 'lngcd',
//       key: 'lngcd',
//     }, {
//       title: 'Edit',
//       key: 'action',
//       render: (text, record) => (
//         <div>
//           <a onClick={this.showModal}>
//             <Icon type="edit" /> Edit
//           </a>
//           <Divider type="vertical" />
//           <a>
//             <Icon type="delete" /> Remove
//           </a>
//         </div>
//       ),
//     }];
//   }

//   state = { visible: false }

//   componentDidMount() {
//     this.props.bannerList();
//   }

//   showModal = () => {
//     console.log('showModal');
//     this.setState({
//       visible: true,
//     });
//   }

//   handleOk = (e) => {
//     console.log(e);
//     this.setState({
//       visible: false,
//     });
//   }

//   handleCancel = (e) => {
//     console.log(e);
//     this.setState({
//       visible: false,
//     });
//   }

//   render() {
//     if (this.props.banner && this.props.banner.data && this.props.banner.data.value) {
//       return (
//         <div className={styles.bannercontainer}>
//           <Button type="primary" icon="plus" size="large" className={styles.addnewbutton}>
//             Add new
//           </Button>
//           <div className={styles.tablecontainer}>
//             <Table columns={this.columns} dataSource={this.props.banner.data.value} className={styles.tables} />
//             <List
//               actions={['create', 'update', 'delete']}
//               model={'banner'}
//               name={'Banner'}
//             />
//           </div>
//           <Modal
//             title="Basic Modal"
//             onCancel={this.handleCancel}
//             visible={this.state.visible}
//             okButtonProps={{ disabled: false }}
//             cancelButtonProps={{ disabled: false }}
//           >
//             <div>
//               <Form>
//                 <FormItem>
//                   <Input
//                     className={styles.inputs}
//                     size="large"
//                     prefix={<Icon type="user" className={styles.prefixIcon} />}
//                     placeholder="Нэвтрэх нэр"
//                   />
//                 </FormItem>
//               </Form>
//             </div>
//           </Modal>
//         </div>
//       );
//     }
//     return (
//       <div className={styles.nocontent}>
//         Loading
//         {/* <List
//           actions={['create', 'update', 'delete']}
//           model={'banner'}
//           name={'Banner'}
//         /> */}
//       </div>
//     );
//   }
// }

// BannerList.propTypes = {
//   bannerList: PropTypes.func.isRequired,
// };
// export default connect(mapStateToProps, { bannerList: Banner.bannerList })(BannerList);
