import * as React from "react";
import { Link } from "react-router-dom";

export class HomeView extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        Home page. <Link to="/register">Register now!</Link>
      </React.Fragment>
    );
  }
}
