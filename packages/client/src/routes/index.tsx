import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthRoute } from "@plugnrent/controller";

import { HomeConnector } from "../modules/home/HomeConnector";
import { RegisterConnector } from "../modules/register/RegisterConnector";
import { LoginConnector } from "../modules/login/LoginConnector";
import { LocationWizardConnector } from "../modules/location-wizard/LocationWizardConnector";
import { DashboardConnector } from "../modules/admin/dashboard/DashboardConnector";

import { WizardRoute } from "./WizardRoute";

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/" component={HomeConnector} />
      <Route exact={true} path="/register" component={RegisterConnector} />
      <Route exact={true} path="/login" component={LoginConnector} />
      <AuthRoute
        exact={true}
        path="/dashboard"
        component={DashboardConnector}
      />
      <WizardRoute
        exact={true}
        path="/company/:companyId/new-location/:locationId?"
        component={LocationWizardConnector}
      />
    </Switch>
  </BrowserRouter>
);
