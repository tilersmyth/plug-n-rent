import * as React from "react";
import { Button } from "antd";

import { CreateCompanyModalConnector } from "../../components/CreateCompanyModal/CreateCompanyModalConnector";

export class GetStartedView extends React.PureComponent {
  render() {
    return (
      <div>
        <h1>Let's get started, eh?</h1>
        <CreateCompanyModalConnector>
          {({ open }) => (
            <Button type="primary" onClick={open}>
              Create account
            </Button>
          )}
        </CreateCompanyModalConnector>
      </div>
    );
  }
}
