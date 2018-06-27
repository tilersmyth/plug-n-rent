import * as React from "react";
import { graphql, ChildDataProps } from "react-apollo";
import gql from "graphql-tag";
import { Redirect } from "react-router-dom";

import { Step1Controller } from "./controller/Step1Controller";
import { Step1View } from "./view/Step1View";
import { Step2Controller } from "./controller/Step2Controller";
import { Step2View } from "./view/Step2View";
import { Step3Controller } from "./controller/Step3Controller";
import { Step3View } from "./view/Step3View";
import { StepTitleView } from "./view/StepTitleView";

import "./style.css";

const steps = [1, 2, 3];

interface Company {
  id: string;
}

interface Response {
  company: Company;
}

class C extends React.PureComponent<ChildDataProps<InputProps, Response>> {
  state = {
    current: 1
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
    const { current } = this.state;

    const {
      data: { loading, company }
    } = this.props;

    if (loading) {
      return null;
    }

    if (!company) {
      return <Redirect to="/" />;
    }

    console.log(company);

    return (
      <div className="steps-container">
        <StepTitleView currentStep={current} steps={steps} />
        <Step1Controller currentStep={current}>
          {// tslint:disable-next-line:jsx-no-multiline-js
          ({ submit }) => (
            <Step1View
              steps={steps}
              next={this.next}
              prev={this.prev}
              submit={submit}
            />
          )}
        </Step1Controller>
        <Step2Controller currentStep={current}>
          <Step2View steps={steps} next={this.next} prev={this.prev} />
        </Step2Controller>
        <Step3Controller currentStep={current}>
          <Step3View steps={steps} next={this.next} prev={this.prev} />
        </Step3Controller>
      </div>
    );
  }
}

const companyQuery = gql`
  query CompanyQuery($id: String!) {
    company(id: $id) {
      id
      name
    }
  }
`;

interface InputProps {
  match: {
    params: {
      companyId: string;
    };
  };
}

export const LocationWizardConnector = graphql<InputProps>(companyQuery, {
  options: props => ({
    variables: { id: props.match.params.companyId }
  })
})(C);
