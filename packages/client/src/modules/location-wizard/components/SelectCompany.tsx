import * as React from "react";
import { Select } from "antd";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { withRouter } from "react-router-dom";

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
  id: string;
  name: string;
}

interface Props {
  company: Company;
  history: any;
}

interface Data {
  userCompanies: {
    map: any;
    filter: any;
  };
}

class LoadUserCompanies extends Query<Data> {}

const SelectCompanyComponent: React.SFC<Props> = ({ company, history }) => (
  <LoadUserCompanies query={userCompanyQuery}>
    {// tslint:disable-next-line:jsx-no-multiline-js
    ({ loading, error, data }) => {
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
          // tslint:disable-next-line:jsx-no-multiline-js
          onChange={
            // tslint:disable-next-line:jsx-no-lambda
            (value: string) => {
              history.push(`/company/${value}/new-location`);
            }
          }
        >
          {// tslint:disable-next-line:jsx-no-multiline-js
          data.userCompanies
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

export const SelectCompany = withRouter<any>(SelectCompanyComponent);
