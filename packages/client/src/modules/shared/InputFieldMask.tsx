import * as React from "react";
import { FieldProps } from "formik";
import { Form, Input } from "antd";
import InputMask from "react-input-mask";

const FormItem = Form.Item;

export const InputPhoneMask: React.SFC<FieldProps<any> & any> = ({
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
      <InputMask mask="999-999-9999" {...field} {...rest} disabled={false}>
        {(inputProps: any) => <Input {...inputProps} />}
      </InputMask>
    </FormItem>
  );
};
