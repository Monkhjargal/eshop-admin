import React from 'react';
import { Transfer, Button, Spin } from 'antd';

import styles from "../../styles.less";

class Step extends React.Component {
    state = {
      loading: false,
      selected: [],
      unselected: [],
    }

    componentWillMount() {
      this.props.getStatusProduct({ status: this.props.stepOneFrom.status })
        .then((res) => {
          this.setState({ loading: false });
          this.getProduct();
        });
    }

    getProduct = () => {
      const { product } = this.props;
      const unselected = [];

      console.log(this.prop);
      if (product.length !== 0) {
        product.map((item) => {
          const data = {
            key: item.skucd,
            skucd: `${item.skucd}`,
            skunm: `${item.skunm}`,
            catnm: `${item.catnm}`,
          };

          return unselected.push(data);
        });
        this.setState({ unselected });
      }
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
        value: item.skucd, // search hesegt haih
      };
    }

    handleSave = () => {
      this.props.changeProductStatus({
        body: {
          status: this.props.stepOneFrom.status === "1" ? 2 : 1,
          reason: this.props.stepOneFrom.reason,
          skucds: this.state.selected,
        },
      });
    }

    render() {
      const { selected, unselected } = this.state;
      if (!this.state.loading) {
        return (
          <div style={{ width: '100%' }}>
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
              render={this.renderItem}
            />

            <div className={styles.stepSaveBtn}>
              <Button type="primary" onClick={this.handleSave} > Хадгалах</Button>
            </div>
          </div>
        );
      }

      return (
        <div style={{ marginLeft: '49%', paddingTop: '15%', paddingBottom: '15%' }}><Spin /></div>
      );
    }
}

export default Step;
