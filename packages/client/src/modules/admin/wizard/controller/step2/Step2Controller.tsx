import * as React from "react";
import { graphql, ChildMutateProps } from "react-apollo";
import gql from "graphql-tag";

import { mapAddress } from "./addressUtil";
import {
  AddressMutation,
  AddressMutationVariables
} from "../../../../../schemaTypes";
import { LocationType } from "../../wizardTypes";

interface Props {
  currentStep: number;
  Location: LocationType;
  nextStep: () => void;
  children: (
    data: {
      submit: (values: AddressMutationVariables) => Promise<null>;
      tempAddress: AddressMutationVariables;
      setAddress: (address: any, coords: any) => void;
      resetAddress: (e: React.SyntheticEvent) => void;
    }
  ) => JSX.Element | null;
}

const initialAddress = {
  address: "",
  address2: "",
  city: "",
  state: "",
  lat: 0,
  lng: 0,
  postalCode: ""
};

class C extends React.PureComponent<
  ChildMutateProps<Props, AddressMutation, AddressMutationVariables>
> {
  state = { tempAddress: { ...initialAddress, phone: "" } };

  componentDidMount() {
    const { Location } = this.props;
    const { tempAddress } = this.state;

    const address = Location.address ? Location.address : { ...tempAddress };

    this.setState({ tempAddress: address });
  }

  submit = async (values: AddressMutationVariables) => {
    const response = await this.props.mutate({
      variables: values
    });

    const {
      data: { createAddress }
    } = response;

    this.setState({ tempAddress: createAddress.address });
    this.props.nextStep();

    return null;
  };

  setAddress = (
    address: google.maps.GeocoderAddressComponent[],
    coords: google.maps.LatLng
  ) => {
    const formattedAddress = mapAddress(address);

    this.setState({
      tempAddress: {
        ...formattedAddress,
        ...coords,
        phone: this.state.tempAddress.phone
      }
    });
  };

  updateAddress = (value: AddressMutationVariables) => {
    const { Location } = this.props;
    this.setState({ location: { ...Location, address: value } });
  };

  resetAddress = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    this.setState({
      tempAddress: { ...initialAddress, phone: this.state.tempAddress.phone }
    });
  };

  render() {
    if (this.props.currentStep !== 2) {
      return null;
    }

    const { tempAddress } = this.state;

    return this.props.children({
      submit: this.submit,
      setAddress: this.setAddress,
      tempAddress,
      resetAddress: this.resetAddress
    });
  }
}

const addressMutation = gql`
  mutation AddressMutation(
    $locationId: String
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
  AddressMutation,
  AddressMutationVariables
>(addressMutation)(C);
