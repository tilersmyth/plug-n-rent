import * as React from "react";
import { Form, Card, Select } from "antd";
import { withFormik, FormikErrors, FormikProps, Form as FForm } from "formik";

import { StepActionView } from "./StepActionView";

const FormItem = Form.Item;
const Option = Select.Option;

interface FormValues {
  company: string;
  name: string;
  slug: string;
}

interface Props {
  steps: number[];
  next: () => void;
  prev?: () => void;
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
}

class C extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    const { steps, next, prev } = this.props;
    return (
      <React.Fragment>
        <FForm>
          <Card className="steps-content">
            <FormItem>
              <Select size="large" defaultValue="lucy">
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </FormItem>
          </Card>
          <div className="steps-action">
            <StepActionView
              currentStep={1}
              steps={steps}
              next={next}
              prev={prev}
            />
          </div>
        </FForm>
      </React.Fragment>
    );
  }
}

export const Step1View = withFormik<Props, FormValues>({
  // validationSchema: validUserSchema,
  mapPropsToValues: () => ({ company: "", name: "", slug: "" }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
  }
})(C);
