import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthRoute } from "@plugnrent/controller";

import { HomeConnector } from "../modules/home/HomeConnector";
import { RegisterConnector } from "../modules/register/RegisterConnector";
import { LoginConnector } from "../modules/login/LoginConnector";
import { AdminLayout } from "../modules/admin/routes/routes";

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/" component={HomeConnector} />
      <Route exact={true} path="/register" component={RegisterConnector} />
      <Route exact={true} path="/login" component={LoginConnector} />
      <AuthRoute path="/admin" component={AdminLayout} />
    </Switch>
  </BrowserRouter>
);
