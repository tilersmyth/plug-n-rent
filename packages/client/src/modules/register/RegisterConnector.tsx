import * as React from "react";
import { RegisterView } from "./view/RegisterView";
import { RegisterController } from "@plugnrent/controller";

export class RegisterConnector extends React.PureComponent {
  render() {
    return (
      <RegisterController>
        {({ submit }) => <RegisterView submit={submit} />}
      </RegisterController>
    );
  }
}
