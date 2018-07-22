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
import { AddressMutationVariables } from "../../schemaTypes";
import { uploadErrors } from "./wizardUtils.ts/uploadErrors";

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
    },
    uploadLoading: false,
    uploadState: {
      error: false,
      message: null
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

  updateAddress = (value: AddressMutationVariables) => {
    this.setState({ location: { ...this.state.location, address: value } });
  };

  resetAddress = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    this.setState({
      tempAddress: {}
    });
  };

  uploadOnChange = (info: any) => {
    const { status, response } = info.file;

    this.setState({
      uploadLoading: true,
      uploadState: { error: false, message: null }
    });

    if (status === "done") {
      const { success, path } = response;
      const message = success ? null : uploadErrors(path);
      console.log(response);

      this.setState({
        uploadLoading: false,
        uploadState: {
          error: !success,
          message
        }
      });
    }
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
    const { current, tempAddress, uploadLoading, uploadState } = this.state;
    const { Location } = this.props;

    return (
      <div className="steps-container">
        <StepTitleView currentStep={current} steps={steps} />
        <Step1Controller currentStep={current} nextStep={this.next}>
          {({ submit }) => (
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
          {({ submit }) => (
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
          <Step3View
            Location={Location}
            steps={steps}
            prev={this.prev}
            onChange={this.uploadOnChange}
            loading={uploadLoading}
            uploadState={uploadState}
          />
        </Step3Controller>
      </div>
    );
  }
}
