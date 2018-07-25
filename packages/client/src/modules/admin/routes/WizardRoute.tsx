import * as React from "react";
import { graphql, ChildProps } from "react-apollo";
import { RouteProps, Route, RouteComponentProps, Redirect } from "react-router";
import gql from "graphql-tag";

import { WizardQuery } from "../../../schemaTypes";

type Props = RouteProps;

class C extends React.PureComponent<ChildProps<Props, WizardQuery>> {
  renderRoute = (routeProps: RouteComponentProps<{ locationId: string }>) => {
    const { data, component } = this.props;

    const {
      match: {
        params: { locationId }
      }
    } = routeProps;

    if (!data || data.loading) {
      return null;
    }

    if (!data.verifyWizard) {
      return <Redirect to="/" />;
    }

    const { location } = data.verifyWizard;

    if (location && location.company && !locationId) {
      return (
        <Redirect to={`/admin/new/${location.company.id}/${location.id}`} />
      );
    }

    const currentStep =
      location && location.name ? (location.address ? 3 : 2) : 1;

    const Component = component as any;

    return (
      <Component
        {...routeProps}
        Location={location}
        currentStep={currentStep}
      />
    );
  };

  render() {
    const { data: _, component: __, ...rest } = this.props;
    return <Route {...rest} render={this.renderRoute} />;
  }
}

const wizardQuery = gql`
  query WizardQuery($companyId: String!, $locationId: String) {
    verifyWizard(companyId: $companyId, locationId: $locationId) {
      location {
        id
        name
        company {
          id
          name
        }
        address {
          id
          address
          address2
          city
          state
          postalCode
          lat
          lng
          phone
        }
      }
    }
  }
`;

export const WizardRoute = graphql<any>(wizardQuery, {
  options: (props: any) => {
    const {
      computedMatch: {
        params: { companyId, locationId }
      }
    } = props;

    return {
      variables: { companyId, locationId }
    };
  }
})(C);
