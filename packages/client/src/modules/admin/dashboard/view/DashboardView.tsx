import * as React from "react";

import { CreateCompanyModalConnector } from "../../../../components/CreateCompanyModal/CreateCompanyModalConnector";

export class DashboardView extends React.PureComponent {
  render() {
    return (
      <div>
        <h1>Let's get started, eh?</h1>
        <CreateCompanyModalConnector />
      </div>
    );
  }
}
