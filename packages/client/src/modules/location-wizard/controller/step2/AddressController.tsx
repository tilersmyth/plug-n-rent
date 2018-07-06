import * as React from "react";
import { AutoComplete, Spin } from "antd";
const Option = AutoComplete.Option;
import { PlacesController } from "./PlacesController";
import { AddressSuggestions } from "../../wizardTypes";

interface Props {
  setAddress: (
    addressComponents: google.maps.GeocoderAddressComponent,
    coords: google.maps.LatLng
  ) => void;
}

export class AddressController extends React.PureComponent<Props> {
  state = {
    address: ""
  };

  handleChange = (address: string) => {
    this.setState({ address });
  };

  handleSelect = (
    addressComponents: google.maps.GeocoderAddressComponent,
    coords: google.maps.LatLng
  ) => {
    this.props.setAddress(addressComponents, coords);
  };

  render() {
    const renderSuggestions = (suggestions: AddressSuggestions[]) =>
      suggestions.map((suggestion: AddressSuggestions) => {
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
