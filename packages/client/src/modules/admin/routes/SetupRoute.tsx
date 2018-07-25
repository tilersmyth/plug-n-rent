import * as React from "react";
import { graphql, ChildProps } from "react-apollo";
import { RouteProps, Route, RouteComponentProps } from "react-router";
import gql from "graphql-tag";

type Props = RouteProps;

export class C extends React.PureComponent<ChildProps<Props, any>> {
  renderRoute = (routeProps: RouteComponentProps<{}>) => {
    const { data, component } = this.props;
    if (!data || data.loading) {
      return null;
    }

    console.log(data);

    const Component = component as any;

    return <Component {...routeProps} />;
  };

  render() {
    const { data: _, component: __, ...rest } = this.props;
    return <Route {...rest} render={this.renderRoute} />;
  }
}

const userCompanyQuery = gql`
  query UserCompanyAuthQuery {
    userCompanies {
      id
    }
  }
`;

export const SetupRoute = graphql<Props, any>(userCompanyQuery)(C);
