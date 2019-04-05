import React from 'react';
import { Form, Button, Transfer, Spin } from "antd";

import styles from "../../styles.less";


class Component extends React.Component {
  state = {
    unselected: [],
    selected: [],
    loading: true,
  }

  componentWillMount() {
    this.props.getProduct({ id: this.props.data.id }).then((res) => {
      this.setState({ loading: false });
      this.getMock();
    });
  }

  handleSave = () => {
    this.setState({ loading: true });
    const { data } = this.props;
    data.skucds = this.state.selected;

    this.props.updateProduct({ body: data, id: data.id }).then((res) => {
      this.setState({ loading: false });
      this.props.onCancel();
    });
  }

  handleChange = (selected) => {
    this.setState({ selected });
  }

  renderItem = (item) => {
    const customLabel = (
      <span className="custom-item">
        {item.skucd} - {item.skunm} - {item.catnm}
      </span>
    );
    return {
      label: customLabel, // for displayed item
      // value: item.skunm, // search hesegt haih
    };
  }

  getMock = () => {
    const { product } = this.props;
    const selected = [];
    const unselected = [];

    product.data.value.map((item) => {
      const data = {
        key: item.skucd,
        skucd: `${item.skucd}`,
        skunm: `${item.skunm}`,
        catnm: `${item.catnm}`,
        chosen: `${item.state}`,
      };
      if (data.chosen === '1') { selected.push(data.key); }

      return unselected.push(data);
    });

    this.setState({ unselected, selected });
  }

  render() {
    // console.log('PROMOTION PRODUCT TRANSFER MODAL PROPS: ', this.props);
    // const { getFieldDecorator } = this.props.form;
    const { loading } = this.state;

    if (!loading) {
      return (
        <div style={{ height: 545, width: '100%' }}>
          <Transfer
            showSearch
            titles={['Сонгогдоогүй бараа', 'Сонгогдсон бараа']}
            dataSource={this.state.unselected}
            listStyle={{
              width: '47%',
              height: 500,
            }}
            filterOption={(inputValue, option) => option.catnm.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1 || option.skunm.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
            targetKeys={this.state.selected}
            onChange={this.handleChange}
            render={item => `${item.skucd} - ${item.skunm} - ${item.catnm}`}
          />

          <div className={styles.stepSaveBtn}>
            <Button type="primary" onClick={this.handleSave}>
              Хадгалах
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div style={{ marginLeft: '49%', paddingTop: '15%', paddingBottom: '15%' }}><Spin /></div>
    );
  }
}

const StepThree = Form.create({ name: 'product' })(Component);
export default StepThree;
