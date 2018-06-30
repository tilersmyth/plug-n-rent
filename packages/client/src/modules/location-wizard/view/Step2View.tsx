import * as React from "react";
import Card from "antd/lib/card";
import { StepActionView } from "./StepActionView";

interface Props {
  steps: number[];
  prev?: () => void;
}

export class Step2View extends React.PureComponent<Props> {
  render() {
    const { steps, prev } = this.props;
    return (
      <React.Fragment>
        <Card className="steps-content" />
        <div className="steps-action">
          <StepActionView currentStep={2} steps={steps} prev={prev} />
        </div>
      </React.Fragment>
    );
  }
}
