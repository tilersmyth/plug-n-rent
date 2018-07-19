import * as React from "react";
import { LoginView } from "./view/LoginView";
import { LoginController } from "@plugnrent/controller";

export class LoginConnector extends React.PureComponent {
  render() {
    return (
      <LoginController>
        {({ submit }) => <LoginView submit={submit} />}
      </LoginController>
    );
  }
}
