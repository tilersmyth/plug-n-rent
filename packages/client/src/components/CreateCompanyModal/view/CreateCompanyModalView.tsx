import * as React from "react";
import { Form as AntForm, Modal, Button } from "antd";
import { withFormik, FormikErrors, FormikProps, Field, Form } from "formik";

import { InputField } from "../../../modules/shared/InputField";
import { createCompanyValidation } from "../../../yupValidation/company";

const FormItem = AntForm.Item;

interface FormValues {
  name: string;
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
  visible: boolean;
  showModal: () => void;
}

class C extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    const { visible, showModal } = this.props;
    return (
      <div>
        <Button type="primary" onClick={showModal}>
          Create account
        </Button>
        <Modal
          visible={visible}
          title="Create account"
          okText="Create"
          footer={null}
        >
          <Form layout="vertical">
            <Field
              label="What is the name of your rental company?"
              name="name"
              placeholder="Company name"
              component={InputField}
            />

            <Field
              label="What is your company's website?"
              name="domain"
              placeholder="www.rentals.com"
              component={InputField}
            />

            <FormItem>
              <Button type="primary" htmlType="submit">
                Create account
              </Button>
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export const CreateCompanyModalView = withFormik<Props, FormValues>({
  validationSchema: createCompanyValidation,
  mapPropsToValues: () => ({ name: "", domain: "" }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
  }
})(C);
