import * as React from "react";
import { graphql, ChildMutateProps } from "react-apollo";
import gql from "graphql-tag";
import {
  LocationMutation,
  LocationMutationVariables
} from "../../../../../schemaTypes";

interface Props {
  currentStep: number;
  nextStep: () => void;
  children: (
    data: {
      submit: (values: LocationMutationVariables) => Promise<null>;
    }
  ) => JSX.Element | null;
}

class C extends React.PureComponent<
  ChildMutateProps<Props, LocationMutation, LocationMutationVariables>
> {
  submit = async (values: LocationMutationVariables) => {
    await this.props.mutate({
      variables: values
    });

    this.props.nextStep();

    return null;
  };

  render() {
    if (this.props.currentStep !== 1) {
      return null;
    }
    return this.props.children({ submit: this.submit });
  }
}

const locationMutation = gql`
  mutation LocationMutation(
    $locationId: String
    $name: String!
    $companyId: String!
  ) {
    createLocation(
      locationId: $locationId
      name: $name
      companyId: $companyId
    ) {
      ok
      location {
        id
        name
      }
      errors {
        path
        message
      }
    }
  }
`;

export const Step1Controller = graphql<
  Props,
  LocationMutation,
  LocationMutationVariables
>(locationMutation)(C);
