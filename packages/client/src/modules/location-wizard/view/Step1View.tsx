import * as React from "react";
import { Form, Card, Button } from "antd";
import {
  withFormik,
  FormikErrors,
  FormikProps,
  Field,
  Form as FForm
} from "formik";

import { StepActionView } from "./StepActionView";
import { SelectCompany } from "../controller/step1/SelectCompany";
import { validLocationSchema } from "../wizardSchemas";
import { InputField } from "../../shared/InputField";

import { LocationMutationMutationVariables } from "../../../operation-result-types";

import { LocationType } from "../wizardTypes";

const FormItem = Form.Item;

interface Props {
  Location: LocationType;
  steps: number[];
  prev?: () => void;
  submit: (
    values: LocationMutationMutationVariables
  ) => Promise<FormikErrors<LocationMutationMutationVariables> | null>;
}

class C extends React.PureComponent<
  FormikProps<LocationMutationMutationVariables> & Props
> {
  render() {
    const { Location, steps, prev } = this.props;
    const { company } = Location;
    return (
      <React.Fragment>
        <FForm>
          <Card className="steps-content">
            <h1 className="title_text">
              {`Let's start by adding a location for ${company.name}.`}
            </h1>
            <p className="title_subtext">
              Additional locations can be added later
            </p>
            <FormItem label="Assign to company" colon={false}>
              <SelectCompany company={company} />
            </FormItem>

            <Field
              label="Location nickname"
              name="name"
              size="large"
              placeholder="E.g. Broadway St."
              component={InputField}
            />
          </Card>
          <div className="steps-action">
            <StepActionView currentStep={1} steps={steps} prev={prev} />

            <Button type="primary" className="btn-next" htmlType="submit">
              Next
            </Button>
          </div>
        </FForm>
      </React.Fragment>
    );
  }
}

export const Step1View = withFormik<Props, LocationMutationMutationVariables>({
  validationSchema: validLocationSchema,
  mapPropsToValues: ({ Location }) => ({
    locationId: Location.id,
    name: Location.name || "",
    companyId: Location.company.id
  }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
  }
})(C);
