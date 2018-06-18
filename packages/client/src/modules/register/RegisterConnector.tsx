import * as React from "react";
import { RegisterView } from "./view/RegisterView";

export class RegisterConnector extends React.PureComponent {
  dummySubmit = async (values: any) => {
    console.log(values);
    return null;
  };

  render() {
    return <RegisterView submit={this.dummySubmit} />;
  }
}
