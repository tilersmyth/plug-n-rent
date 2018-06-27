import * as React from "react";

interface Props {
  currentStep: number;
}

export class Step3Controller extends React.PureComponent<Props> {
  render() {
    if (this.props.currentStep !== 3) {
      return null;
    }

    return this.props.children;
  }
}
