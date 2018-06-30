import * as React from "react";
import { graphql, ChildMutateProps } from "react-apollo";
import gql from "graphql-tag";
import {
  LocationMutationMutation,
  LocationMutationMutationVariables
} from "../../../operation-result-types";

interface Props {
  currentStep: number;
  nextStep: () => void;
  children: (
    data: {
      submit: (values: LocationMutationMutationVariables) => Promise<null>;
    }
  ) => JSX.Element | null;
}

class C extends React.PureComponent<
  ChildMutateProps<
    Props,
    LocationMutationMutation,
    LocationMutationMutationVariables
  >
> {
  submit = async (values: LocationMutationMutationVariables) => {
    const response = await this.props.mutate({
      variables: values
    });
    const { data } = response;

    console.log(data);

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
  LocationMutationMutation,
  LocationMutationMutationVariables
>(locationMutation)(C);
