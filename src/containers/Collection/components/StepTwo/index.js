import React from 'react';
import { Form, Spin, Row, Icon, Button, Transfer } from "antd";

import styles from "../../styles.less";

class Component extends React.Component {
  state = {
    unselected: [],
    selected: [],
    loading: true,
    bloading: false,
  }

  componentWillMount() {
    this.props.getProduct({ id: this.props.id })
      .then((res) => {
        this.setState({ loading: false });
        this.renderProduct();
      });
  }

  renderProduct = () => {
    const { product } = this.props;
    const selected = [];
    const unselected = [];
    // console.log(product);

    product.data.map((item) => {
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

    console.log('hello');
    // this.setState({ unselected, selected });
  }

  handleSave = () => {
    // console.log(this.state.selected, this.props.stepOneData);
    this.setState({ bloading: true });
    const { stepOneData } = this.props;
    // console.log(stepOneData, this.state.selected);
    let formData = new FormData();

    this.state.selected.map(i => formData.append("skucds", i));
    Object.keys(stepOneData).map(keyname => (keyname === 'fileList' || keyname === 'imageList' ? '' : formData.append(keyname, stepOneData[keyname])));
    stepOneData.fileList.map(i => formData.append("files", i.originFileObj, i.name));
    stepOneData.fileList.map(i => (i.originFileObj === undefined ? formData.append("imgnm", i.name) : ''));

    const isfiles = true;
    this.props.create({ body: formData, id: this.props.id, isfiles }).then((res) => {
      this.setState({ bloading: false });
      this.props.onCancel();
      this.props.refresh();
    });
  }

  handleChange = (selected) => {
    // console.log(targetKeys, direction, moveKeys);
    this.setState({ selected });
  }

  render() {
    // console.log('STEP RWO FORM DATA', this.props);
    const {
      selected, unselected, loading, bloading,
    } = this.state;
    return (
      <Row style={{ width: '100%', marginTop: 25 }}>
        {
          !loading ? (
            <Transfer
              showSearch
              titles={['Сонгогдоогүй бараа', 'Сонгогдсон бараа']}
              dataSource={unselected}
              listStyle={{
                width: '47%',
                height: 500,
              }}
              targetKeys={selected}
              onChange={this.handleChange}
              render={item => `${item.skucd} - ${item.skunm} - ${item.catnm}`}
              filterOption={(inputValue, option) => option.catnm.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1 || option.skunm.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1 || option.skucd.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
            />
          ) : (
            <div style={{ marginLeft: '49%', paddingTop: '15%', paddingBottom: '15%' }}><Spin /></div>
          )
        }

        <div className={styles.stepSaveBtn}>
          <Button type="dashed" onClick={this.props.prevStep}><Icon type="arrow-left" /></Button>{' '}
          <Button type="primary" onClick={this.handleSave} loading={bloading} >Хадгалах</Button>
        </div>
      </Row>
    );
  }
}

const StepTwo = Form.create({ name: 'product' })(Component);
export default StepTwo;
