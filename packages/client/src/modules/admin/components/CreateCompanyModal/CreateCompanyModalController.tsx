import * as React from "react";
import gql from "graphql-tag";
import { ChildMutateProps, graphql } from "react-apollo";
import {
  CreateCompanyMutation,
  CreateCompanyMutationVariables
} from "../../../../schemaTypes";
import { normalizeErrors } from "../../../../utils/normalizeErrors";

interface Props {
  children: (
    data: {
      submit: (
        values: CreateCompanyMutationVariables
      ) => Promise<{
        errors: { [key: string]: string } | null;
        company: string | null;
      }>;
    }
  ) => JSX.Element | null;
}

class C extends React.PureComponent<
  ChildMutateProps<Props, CreateCompanyMutation, CreateCompanyMutationVariables>
> {
  submit = async (values: CreateCompanyMutationVariables) => {
    const {
      data: {
        createCompany: { errors, company }
      }
    } = await this.props.mutate({
      variables: values
    });

    return {
      errors: errors ? normalizeErrors(errors) : null,
      company: company ? company.id : null
    };
  };

  render() {
    return this.props.children({ submit: this.submit });
  }
}

const createCompanyMutation = gql`
  mutation CreateCompanyMutation($name: String!, $domain: String!) {
    createCompany(name: $name, domain: $domain) {
      errors {
        path
        message
      }
      company {
        id
      }
    }
  }
`;

export const CreateCompanyModalController = graphql<
  Props,
  CreateCompanyMutation,
  CreateCompanyMutationVariables
>(createCompanyMutation)(C);
