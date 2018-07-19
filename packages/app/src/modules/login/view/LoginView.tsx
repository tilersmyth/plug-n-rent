import * as React from "react";
import {
  withFormik,
  FormikErrors,
  FormikValues,
  FormikProps,
  Field
} from "formik";
import { View, Text } from "react-native";
import { Button, Card } from "react-native-elements";
import { loginSchema } from "@plugnrent/common";
import { InputField } from "../../shared/InputField";

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormikValues> | null>;
}

class C extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    const { handleSubmit } = this.props;
    return (
      <View
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Card>
          <Text style={{ fontSize: 30, marginBottom: 10 }}>Login</Text>
          <Field
            name="email"
            placeholder="E-mail"
            component={InputField}
            containerStyle={{ width: "100%" }}
            autoCapitalize="none"
          />

          <Field
            name="password"
            secureTextEntry={true}
            placeholder="Password"
            component={InputField}
            containerStyle={{ width: "100%" }}
            autoCapitalize="none"
          />

          <Button
            style={{ marginTop: 30 }}
            title="submit"
            onPress={handleSubmit as any}
          />
        </Card>
      </View>
    );
  }
}

export const LoginView = withFormik<Props, FormValues>({
  validationSchema: loginSchema,
  mapPropsToValues: () => ({ email: "", password: "" }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);

    if (errors) {
      setErrors(errors);
    }
  }
})(C);
