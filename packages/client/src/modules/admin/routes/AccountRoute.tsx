import * as React from "react";
import { graphql, ChildProps } from "react-apollo";
import { RouteProps, Route, RouteComponentProps, Redirect } from "react-router";
import { ReactCookieProps } from "react-cookie";
import gql from "graphql-tag";

type Props = RouteProps & ReactCookieProps;

export class C extends React.PureComponent<ChildProps<Props, any>> {
  renderRoute = (routeProps: RouteComponentProps<{}>) => {
    const { data, component, cookies } = this.props;
    if (!data || data.loading) {
      return null;
    }

    if (!data.locationAuthByTeam || !data.locationAuthByTeam.id) {
      return <Redirect to="/admin/get-started" />;
    }

    const {
      locationAuthByTeam: { id }
    } = data;

    if (cookies) {
      const existingCookie = cookies.get("pnr_loc");

      if (existingCookie !== id) {
        cookies.set("pnr_loc", id);
      }
    }

    const Component = component as any;

    return <Component {...routeProps} />;
  };

  render() {
    const { data: _, component: __, ...rest } = this.props;
    return <Route {...rest} render={this.renderRoute} />;
  }
}

const locationAuthByTeamQuery = gql`
  query LocationAuthByTeamQuery($locationId: String) {
    locationAuthByTeam(locationId: $locationId) {
      id
    }
  }
`;

export const AccountRoute = graphql<Props, any>(locationAuthByTeamQuery, {
  options: props => {
    const { cookies } = props;

    const locationId = cookies ? cookies.get("pnr_loc") : null;

    return { variables: { locationId } };
  }
})(C);
