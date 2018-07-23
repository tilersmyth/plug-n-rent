import * as React from "react";
import { Card } from "antd";

interface Props {
  title: string;
}

const containerStyle = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "80vh"
};

const formStyle = {
  maxWidth: 400
};

export class AuthLayout extends React.PureComponent<Props> {
  render() {
    return (
      <div style={containerStyle}>
        <Card title={this.props.title} style={formStyle}>
          {this.props.children}
        </Card>
      </div>
    );
  }
}
