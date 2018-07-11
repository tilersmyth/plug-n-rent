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

  render() {
    const { currentStep, prev } = this.props;

    return (
      <React.Fragment>
        {// tslint:disable-next-line:jsx-no-multiline-js
        currentStep > 1 && (
          <Button className="btn-prev" onClick={prev}>
            Previous
          </Button>
        )}
      </React.Fragment>
    );
  }
}
