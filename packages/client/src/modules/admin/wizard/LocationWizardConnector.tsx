import * as React from "react";

import { Step1Controller } from "./controller/step1/Step1Controller";
import { Step1View } from "./view/Step1View";
import { Step2Controller } from "./controller/step2/Step2Controller";
import { Step2View } from "./view/Step2View";
import { Step3Controller } from "./controller/step3/Step3Controller";
import { Step3View } from "./view/Step3View";
import { StepTitleView } from "./view/StepTitleView";
import { LocationType } from "./wizardTypes";

import "./style.css";

const steps = [1, 2, 3];

interface Props {
  currentStep: number;
  Location: LocationType;
}

export class LocationWizardConnector extends React.PureComponent<Props> {
  state = {
    current: 1
  };

  componentDidMount() {
    const { currentStep } = this.props;

    this.setState({ current: currentStep });
  }

  next = () => {
    const current = this.state.current + 1;
    this.setState({ current });
  };
  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  };

  render() {
    const { current } = this.state;
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
          Location={Location}
          currentStep={current}
          nextStep={this.next}
        >
          {({ submit, setAddress, tempAddress, resetAddress }) => (
            <Step2View
              Location={Location}
              setAddress={setAddress}
              tempAddress={tempAddress}
              resetAddress={resetAddress}
              steps={steps}
              prev={this.prev}
              submit={submit}
            />
          )}
        </Step2Controller>
        <Step3Controller currentStep={current}>
          {({ uploadOnChange, uploadLoading, uploadState, complete }) => (
            <Step3View
              Location={Location}
              steps={steps}
              prev={this.prev}
              complete={complete}
              onChange={uploadOnChange}
              loading={uploadLoading}
              uploadState={uploadState}
            />
          )}
        </Step3Controller>
      </div>
    );
  }
}
