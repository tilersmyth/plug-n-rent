import * as React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Select } from "antd";
import { withRouter } from "react-router-dom";

import { CreateCompanyModalConnector } from "../../../components/CreateCompanyModal/CreateCompanyModalConnector";

const Option = Select.Option;

interface Company {
  id?: string;
  name: string;
}

class C extends React.PureComponent<any, any> {
  handleChange = (value: string) => {
    if (value === "new_co") {
      return;
    }

    const { history } = this.props;

    history.push(`/admin/new/${value}`);
  };

  render() {
    const { data, company } = this.props;

    if (data.loading) {
      return "Loading...";
    }

    if (!data.userCompanies) {
      return null;
    }

    return (
      <CreateCompanyModalConnector>
        {({ open }) => (
          <Select
            size="large"
            defaultValue={company.name}
            defaultActiveFirstOption={false}
            onChange={this.handleChange}
            // tslint:disable-next-line:jsx-no-lambda
            onSelect={(value: string) => {
              return value === "new_co" ? open() : null;
            }}
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
        )}
      </CreateCompanyModalConnector>
    );
  }
}

const selectUserCompaniesQuery = gql`
  query SelectUserCompaniesQuery {
    userCompanies {
      id
      name
    }
  }
`;

export const SelectCompanyInput = graphql<any, any, any>(
  selectUserCompaniesQuery
)(withRouter(C));
