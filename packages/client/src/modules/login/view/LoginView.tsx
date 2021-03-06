import * as React from "react";
import { Form as AntForm, Icon, Button } from "antd";
import { withFormik, FormikProps, Field, Form } from "formik";
import { loginSchema } from "@plugnrent/common";
import { Link } from "react-router-dom";

import { InputField } from "../../shared/InputField";
import { AuthLayout } from "../../../components/AuthLayout";

const FormItem = AntForm.Item;

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  onFinish: () => void;
  submit: (values: FormValues) => Promise<{ [key: string]: string } | null>;
}

class C extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    return (
      <AuthLayout title="Login">
        <Form style={{ display: "flex" }}>
          <div style={{ width: 400, margin: "auto" }}>
            <Field
              name="email"
              prefix={
                <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} /> as any
              }
              placeholder="E-mail"
              component={InputField}
            />

            <Field
              name="password"
              type="password"
              prefix={
                <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} /> as any
              }
              placeholder="Password"
              component={InputField}
            />
            <FormItem>
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Login
              </Button>
            </FormItem>
            <FormItem>
              Or <Link to="/register">register now!</Link>
            </FormItem>
          </div>
        </Form>
      </AuthLayout>
    );
  }
}

export const LoginView = withFormik<Props, FormValues>({
  validationSchema: loginSchema,
  validateOnBlur: false,
  validateOnChange: false,
  mapPropsToValues: () => ({ email: "", password: "" }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);

    if (!errors) {
      props.onFinish();
      return;
    }

    setErrors(errors);
  }
})(C);
