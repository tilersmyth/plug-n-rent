import * as React from "react";

import { Step1Controller } from "./controller/step1/Step1Controller";
import { Step1View } from "./view/Step1View";
import { Step2Controller } from "./controller/step2/Step2Controller";
import { Step2View } from "./view/Step2View";
import { Step3Controller } from "./controller/step3/Step3Controller";
import { Step3View } from "./view/Step3View";
import { StepTitleView } from "./view/StepTitleView";
import { LocationType } from "./wizardTypes";
import { mapAddress } from "./controller/step2/addressUtil";

import "./style.css";
import { AddressMutationMutationVariables } from "../../operation-result-types";

const steps = [1, 2, 3];

interface Props {
  currentStep: number;
  Location: LocationType;
}

export class LocationWizardConnector extends React.PureComponent<Props> {
  state = {
    current: 1,
    location: {
      id: "",
      name: "",
      company: {
        id: "",
        name: ""
      },
      address: {}
    },
    tempAddress: {
      address: "",
      address2: "",
      city: "",
      state: "",
      lat: 0,
      lng: 0,
      postalCode: "",
      phone: ""
    }
  };

  componentDidMount() {
    const { currentStep, Location } = this.props;

    const tempAddress = Location.address ? Location.address : {};

    this.setState({ current: currentStep, tempAddress });
  }

  setAddress = (
    address: google.maps.GeocoderAddressComponent[],
    coords: google.maps.LatLng
  ) => {
    const formattedAddress = mapAddress(address);

    this.setState({
      tempAddress: {
        ...formattedAddress,
        ...coords
      }
    });
  };

  updateAddress = (value: AddressMutationMutationVariables) => {
    this.setState({ location: { ...this.state.location, address: value } });
  };

  resetAddress = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    this.setState({
      tempAddress: {}
    });
  };

  next = () => {
    const current = this.state.current + 1;
    this.setState({ current });
  };
  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  };

  render() {
    const { current, tempAddress } = this.state;
    const { Location } = this.props;

    return (
      <div className="steps-container">
        <StepTitleView currentStep={current} steps={steps} />
        <Step1Controller currentStep={current} nextStep={this.next}>
          {// tslint:disable-next-line:jsx-no-multiline-js
          ({ submit }) => (
            <Step1View
              Location={Location}
              steps={steps}
              prev={this.prev}
              submit={submit}
            />
          )}
        </Step1Controller>
        <Step2Controller
          currentStep={current}
          nextStep={this.next}
          update={this.updateAddress}
        >
          {// tslint:disable-next-line:jsx-no-multiline-js
          ({ submit }) => (
            <Step2View
              Location={Location}
              setAddress={this.setAddress}
              tempAddress={tempAddress}
              resetAddress={this.resetAddress}
              steps={steps}
              prev={this.prev}
              submit={submit}
            />
          )}
        </Step2Controller>
        <Step3Controller currentStep={current}>
          <Step3View steps={steps} prev={this.prev} />
        </Step3Controller>
      </div>
    );
  }
}
