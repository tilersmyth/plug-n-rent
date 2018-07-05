import * as React from "react";
import { graphql, ChildMutateProps } from "react-apollo";
import gql from "graphql-tag";

import {
  AddressMutationMutation,
  AddressMutationMutationVariables
} from "../../../operation-result-types";

interface Props {
  currentStep: number;
  nextStep: () => void;
  update: (address: any) => void;
  children: (
    data: {
      submit: (values: AddressMutationMutationVariables) => Promise<null>;
    }
  ) => JSX.Element | null;
}

class C extends React.PureComponent<
  ChildMutateProps<
    Props,
    AddressMutationMutation,
    AddressMutationMutationVariables
  >
> {
  submit = async (values: AddressMutationMutationVariables) => {
    const response = await this.props.mutate({
      variables: values
    });

    const {
      data: { createAddress }
    } = response;

    this.props.update(createAddress.address);
    this.props.nextStep();

    return null;
  };

  render() {
    if (this.props.currentStep !== 2) {
      return null;
    }
    return this.props.children({ submit: this.submit });
  }
}

const addressMutation = gql`
  mutation AddressMutation(
    $locationId: String!
    $id: String
    $address: String!
    $address2: String
    $city: String!
    $state: String!
    $postalCode: String!
    $lat: Float!
    $lng: Float!
    $phone: String!
  ) {
    createAddress(
      locationId: $locationId
      id: $id
      address: $address
      address2: $address2
      city: $city
      state: $state
      postalCode: $postalCode
      lat: $lat
      lng: $lng
      phone: $phone
    ) {
      ok
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
      errors {
        path
        message
      }
    }
  }
`;

export const Step2Controller = graphql<
  Props,
  AddressMutationMutation,
  AddressMutationMutationVariables
>(addressMutation)(C);
