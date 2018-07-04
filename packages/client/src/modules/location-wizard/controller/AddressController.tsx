import * as React from "react";
import { AutoComplete, Spin } from "antd";
const Option = AutoComplete.Option;
import { PlacesController } from "./PlacesController";

export class AddressController extends React.PureComponent<any, any> {
  state = {
    address: ""
  };

  handleChange = (address: string) => {
    this.setState({ address });
  };

  handleSelect = (address: any, coords: any) => {
    if (address) {
      this.props.setAddress(address[0].address_components, coords);
    }
  };

  render() {
    const renderSuggestions = (suggestions: any) =>
      suggestions.map((suggestion: any) => {
        return (
          <Option key={suggestion.description}>{suggestion.description}</Option>
        );
      });

    return (
      <React.Fragment>
        <PlacesController
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {// tslint:disable-next-line:jsx-no-multiline-js
          ({ onChange, onSelect, suggestions, loading }) => {
            return (
              <div>
                <AutoComplete
                  placeholder="Start typing..."
                  size="large"
                  onSelect={onSelect}
                  onChange={onChange}
                  notFoundContent={loading ? <Spin size="small" /> : null}
                  filterOption={false}
                >
                  {renderSuggestions(suggestions)}
                </AutoComplete>
              </div>
            );
          }}
        </PlacesController>
      </React.Fragment>
    );
  }
}
