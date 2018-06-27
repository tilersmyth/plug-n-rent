import * as React from "react";
import { graphql, ChildMutateProps } from "react-apollo";
import gql from "graphql-tag";

export interface LocationMutationData {
  path: string;
  message: string;
}

export interface LocationMutation {
  location: LocationMutationData[] | null;
}

interface LocationMutationVariables {
  name: string;
  slug: string;
}

interface Props {
  currentStep: number;
  children: (
    data: { submit: (values: LocationMutationVariables) => Promise<null> }
  ) => JSX.Element | null;
}

class C extends React.PureComponent<
  ChildMutateProps<Props, LocationMutation, LocationMutationVariables>
> {
  submit = async (values: LocationMutationVariables) => {
    console.log(values);

    const response = await this.props.mutate({
      variables: values
    });

    console.log("response: ", response);

    return null;
  };

  render() {
    if (this.props.currentStep !== 1) {
      return null;
    }
    return this.props.children({ submit: this.submit });
  }
}

const registerMutation = gql`
  mutation RegisterMutation($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      path
      message
    }
  }
`;

export const Step1Controller = graphql<
  Props,
  LocationMutation,
  LocationMutationVariables
>(registerMutation)(C);
