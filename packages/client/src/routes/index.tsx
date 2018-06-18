import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { HomeConnector } from "../modules/home/HomeConnector";

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/" component={HomeConnector} />
    </Switch>
  </BrowserRouter>
);
