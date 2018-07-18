import * as React from "react";
import { RegisterController } from "@plugnrent/controller";
import { RegisterView } from "./view/RegisterView";

export class RegisterConnector extends React.PureComponent {
  render() {
    return (
      <RegisterController>
        {({ submit }) => <RegisterView submit={submit} />}
      </RegisterController>
    );
  }
}
