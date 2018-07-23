import * as React from "react";
import gql from "graphql-tag";
import { ChildMutateProps, graphql } from "react-apollo";
import {
  CreateCompanyMutation,
  CreateCompanyMutationVariables
} from "../../schemaTypes";

interface Props {
  children: (
    data: {
      submit: (
        values: CreateCompanyMutationVariables
      ) => Promise<{ [key: string]: string } | null>;
    }
  ) => JSX.Element | null;
}

class C extends React.PureComponent<
  ChildMutateProps<Props, CreateCompanyMutation, CreateCompanyMutationVariables>
> {
  submit = async (values: CreateCompanyMutationVariables) => {
    console.log(values);

    const response = await this.props.mutate({
      variables: values
    });

    console.log("response: ", response);

    return null;
  };

  render() {
    return this.props.children({ submit: this.submit });
  }
}

const createCompanyMutation = gql`
  mutation CreateCompanyMutation($name: String!, $domain: String!) {
    createCompany(name: $name, domain: $domain) {
      path
      message
    }
  }
`;

export const CreateCompanyModalController = graphql<
  Props,
  CreateCompanyMutation,
  CreateCompanyMutationVariables
>(createCompanyMutation)(C);
