import * as React from "react";
import * as ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { CookiesProvider } from "react-cookie";

import registerServiceWorker from "./registerServiceWorker";
import { client } from "./apollo";
import { Routes } from "./routes";

import "./index.css";

ReactDOM.render(
  <ApolloProvider client={client}>
    <CookiesProvider>
      <Routes />
    </CookiesProvider>
  </ApolloProvider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
