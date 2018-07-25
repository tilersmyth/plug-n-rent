import * as React from "react";
import { Modal, Button } from "antd";
import { withFormik, FormikProps, Field, Form } from "formik";

import { InputField } from "../../../../shared/InputField";
import { createCompanyValidation } from "../../../../../yupValidation/company";
import { NormalizedErrorMap } from "../../../../../types/NormalizedErrorMap";

interface FormValues {
  name: string;
  domain: string;
}

interface Props {
  submit: (
    values: FormValues
  ) => Promise<{ errors: NormalizedErrorMap | null; company: string | null }>;
  onFinish: (id: string) => void;
  visible: boolean;
  handleCancel: () => void;
}

const modalStyle = {
  paddingBottom: 0
};

const modalFooterStyle = {
  borderTop: "1px solid #e8e8e8",
  marginRight: -24,
  marginLeft: -24,
  paddingRight: 24,
  paddingLeft: 24,
  paddingTop: 10,
  paddingBottom: 10,
  textAlign: "right" as "right"
};

const btnStyle = {
  marginRight: 10
};

class C extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    const { visible, handleCancel } = this.props;
    return (
      <div>
        <Modal
          visible={visible}
          title="Create account"
          footer={null}
          maskClosable={false}
          bodyStyle={modalStyle}
          onCancel={handleCancel}
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

            <div style={modalFooterStyle}>
              <Button style={btnStyle} onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </div>
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
    const results = await props.submit(values);

    if (results.errors) {
      setErrors(results.errors);
      return;
    }

    if (results.company) {
      props.onFinish(results.company);
    }
  }
})(C);
