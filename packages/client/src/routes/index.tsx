import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { HomeConnector } from "../modules/home/HomeConnector";
import { RegisterConnector } from "../modules/register/RegisterConnector";

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/" component={HomeConnector} />
      <Route exact={true} path="/register" component={RegisterConnector} />
    </Switch>
  </BrowserRouter>
);
