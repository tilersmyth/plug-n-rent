import * as React from "react";
import { Steps } from "antd";

const Step = Steps.Step;

interface Props {
  currentStep: number;
  steps: number[];
}

export class StepTitleView extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { currentStep, steps } = this.props;

    return (
      <Steps current={currentStep - 1} progressDot={true}>
        {steps.map((item: any) => <Step key={item} />)}
      </Steps>
    );
  }
}
