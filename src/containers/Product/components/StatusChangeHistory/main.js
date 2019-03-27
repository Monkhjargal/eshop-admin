import React from "react";
import { Form, Input } from "antd";

class Component extends React.Component {
  componentDidMount() {
    console.log('did mount');
  }

  render() {
    return (
      <div>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item>
            <Input />
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Component;
