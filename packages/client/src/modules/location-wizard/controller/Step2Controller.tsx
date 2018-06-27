import * as React from "react";

interface Props {
  currentStep: number;
}

export class Step2Controller extends React.PureComponent<Props> {
  render() {
    if (this.props.currentStep !== 2) {
      return null;
    }

    return this.props.children;
  }
}
