import React from 'react';
import { List } from '../../components';
import PageHeaderLayout from "../../layouts/PageHeaderLayout";

const divStyle = {
  width: '90%',
  overflow: 'hidden',
};

export default () => (
  <PageHeaderLayout title="Brand information" style={divStyle}>
    <List
      actions={['create', 'update', 'delete']}
      model={'Brandlist'}
      name={'Brand'}
    />
  </PageHeaderLayout>
);
// import React from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { Button, List } from 'antd';
// import PageHeaderLayout from "../../layouts/PageHeaderLayout";

// const mapStateToProps = (state) => {
//   const { brands } = state;
//   return {
//     brands,
//   };
// };

// class BrandList extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   componentDidMount() {
//   }
//   render() {
//     return (
//       <div>
//         BrandList
//       </div>
//     );
//   }
// }

// export default connect(mapStateToProps)(BrandList);
