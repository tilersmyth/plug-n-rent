import * as React from "react";
import { Switch } from "react-router-dom";
import { withCookies, ReactCookieProps } from "react-cookie";

import { AccountRoute } from "./AccountRoute";
import { SetupRoute } from "./SetupRoute";
import { WizardRoute } from "./WizardRoute";

import { GetStartedConnector } from "../get-started/GetStartedConnector";
import { DashboardConnector } from "../dashboard/DashboardConnector";
import { LocationWizardConnector } from "../wizard/LocationWizardConnector";

class C extends React.PureComponent<ReactCookieProps> {
  render() {
    const { cookies } = this.props;

    return (
      <Switch>
        <SetupRoute
          exact={true}
          path="/admin/get-started"
          component={GetStartedConnector}
        />

        <WizardRoute
          cookies={cookies}
          exact={true}
          path="/admin/new/:companyId/:locationId?"
          component={LocationWizardConnector}
        />

        <AccountRoute
          cookies={cookies}
          exact={true}
          path="/admin/dashboard"
          component={DashboardConnector}
        />
      </Switch>
    );
  }
}

export const AdminLayout = withCookies(C);
