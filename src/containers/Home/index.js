// @flow
import { Chart, Geom, Axis, Tooltip, Guide } from 'bizcharts';
import React, { Component } from 'react';
import { Tabs, Card, Icon, Avatar, Col, Row } from 'antd';
import { connect } from 'react-redux';
import PageHeaderLayout from "../../layouts/PageHeaderLayout";
// import { Chart, Axis, Tooltip, Geom, Coord, Legend, Label } from "bizcharts";
// import PropTypes from 'prop-types';
// import { DataSet } from '@antv/data-set';
// import { ChartModule } from "../../models";

const mapStateToProps = (state) => {
  const {
    chart,
  } = state;
  return {};
};
const { Meta } = Card;
const divStyle = {
  width: '90%',
  overflow: 'hidden',
};

class Home extends Component {
  componentDidMount() {
  }
  render() {
    return (
      <PageHeaderLayout title="Category information" style={divStyle}>
        <div style={{ textAlign: 'center' }}>
          <Row gutter={16}>
            <Col span={8}>
              <Card
                style={{ width: 300 }}
                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
              >
                <Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title="Card title"
                  description="This is the description"
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card
                style={{ width: 300 }}
                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
              >
                <Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title="Card title"
                  description="This is the description"
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card
                style={{ width: 300 }}
                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
              >
                <Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title="Card title"
                  description="This is the description"
                />
              </Card>
            </Col>
          </Row>
        </div>
      </PageHeaderLayout>
    );
  }
}
export default connect(mapStateToProps, {})(Home);

