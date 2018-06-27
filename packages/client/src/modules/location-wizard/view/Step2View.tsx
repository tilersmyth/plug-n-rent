import * as React from "react";
import Card from "antd/lib/card";
import { StepActionView } from "./StepActionView";

interface Props {
  steps: number[];
  next: () => void;
  prev?: () => void;
}

export class Step2View extends React.PureComponent<Props> {
  render() {
    const { steps, next, prev } = this.props;
    return (
      <React.Fragment>
        <Card className="steps-content" />
        <div className="steps-action">
          <StepActionView
            currentStep={2}
            steps={steps}
            next={next}
            prev={prev}
          />
        </div>
      </React.Fragment>
    );
  }
}
