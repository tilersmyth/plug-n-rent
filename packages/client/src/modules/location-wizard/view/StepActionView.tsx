import * as React from "react";
import { Button } from "antd";

interface Props {
  currentStep: number;
  steps: number[];
  prev?: () => void;
}

export class StepActionView extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }

  done = () => {
    console.log("Wizard complete!");
  };

  render() {
    const { currentStep, prev, steps } = this.props;

    return (
      <React.Fragment>
        {currentStep > 1 && (
          <Button className="btn-prev" onClick={prev}>
            Previous
          </Button>
        )}
        {currentStep === steps.length && (
          <Button className="btn-next" onClick={this.done}>
            Add products later
          </Button>
        )}
      </React.Fragment>
    );
  }
}
