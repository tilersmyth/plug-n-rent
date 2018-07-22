import * as React from "react";
import { Select } from "antd";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { withRouter, RouteComponentProps } from "react-router-dom";

const Option = Select.Option;

const userCompanyQuery = gql`
  query UserCompanyQuery {
    userCompanies {
      id
      name
    }
  }
`;

interface Company {
  id?: string;
  name: string;
}

interface Props extends RouteComponentProps<{}> {
  company: Company;
}

interface Data {
  userCompanies: {
    filter: (item: Company) => [Company];
  };
}

class LoadUserCompanies extends Query<Data> {}

const SelectCompanyComponent: React.SFC<Props> = ({ company, history }) => (
  <LoadUserCompanies query={userCompanyQuery}>
    {({ loading, error, data }) => {
      if (loading) {
        return "Loading...";
      }

      if (!data) {
        return null;
      }

      return (
        <Select
          size="large"
          defaultValue={company.name}
          defaultActiveFirstOption={false}
          onChange={
            // tslint:disable-next-line:jsx-no-lambda
            (value: string) => {
              history.push(`/company/${value}/new-location`);
            }
          }
        >
          {data.userCompanies
            .filter((item: Company) => {
              return item.id !== company.id;
            })
            .map((item: Company) => {
              return (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              );
            })}
          <Option key="add_new" value="new_co">
            Create new company
          </Option>
        </Select>
      );
    }}
  </LoadUserCompanies>
);

export const SelectCompany = withRouter<Props>(SelectCompanyComponent);
