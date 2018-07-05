import * as React from "react";
import gql from "graphql-tag";
import { graphql, ChildDataProps } from "react-apollo";
import { Route, Redirect } from "react-router-dom";

interface Props {
  component: any;
}

// interface InputProps {
//   match: {
//     params: {
//       companyId: string;
//       locationId: string;
//     };
//   };
// }

// interface Response {
//   verifyWizard: {
//     location: any;
//   };
// }

const WizardRouteComponent: React.SFC<ChildDataProps<any, any> & Props> = ({
  component: Component,
  data: { loading, verifyWizard },
  computedMatch: {
    params: { locationId }
  },
  ...rest
}) => {
  if (loading) {
    return null;
  }

  if (!verifyWizard) {
    return <Redirect to="/" />;
  }

  const { location } = verifyWizard;

  if (location && !locationId) {
    return (
      <Redirect
        to={`/company/${location.company.id}/new-location/${location.id}`}
      />
    );
  }

  const currentStep = location.name ? (location.address ? 3 : 2) : 1;

  return (
    <Route
      {...rest}
      render={
        // tslint:disable-next-line:jsx-no-multiline-js
        // tslint:disable-next-line:jsx-no-lambda
        props => (
          <Component Location={location} currentStep={currentStep} {...props} />
        )
      }
    />
  );
};

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
})(WizardRouteComponent);
