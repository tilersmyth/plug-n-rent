import * as React from "react";
import { FieldProps } from "formik";
import { Form, Input } from "antd";

const FormItem = Form.Item;

export const InputField: React.SFC<FieldProps<any> & any> = ({
  field,
  form: { touched, errors },
  ...props
}) => {
  const errorMsg = touched[field.name] && errors[field.name];
  const { label, ...rest } = props;

  return (
    <FormItem
      label={label}
      colon={false}
      help={errorMsg}
      validateStatus={errorMsg ? "error" : undefined}
    >
      <Input {...field} {...rest} />
    </FormItem>
  );
};
