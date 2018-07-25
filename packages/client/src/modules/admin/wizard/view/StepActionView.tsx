import * as React from "react";
import { Button } from "antd";

interface Props {
  currentStep: number;
  steps: number[];
  prev?: () => void;
  complete?: () => void;
}

export class StepActionView extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { currentStep, prev, steps, complete } = this.props;

    return (
      <React.Fragment>
        {currentStep > 1 && (
          <Button className="btn-prev" onClick={prev}>
            Previous
          </Button>
        )}
        {currentStep === steps.length && (
          <Button className="btn-next" onClick={complete}>
            Add products later
          </Button>
        )}
      </React.Fragment>
    );
  }
}
