import * as React from "react";

interface State {
  gmapsLoaded: boolean;
  suggestions: any;
  loading: boolean;
}

interface Props {
  onChange: (values: string) => void;
  onSelect: (address: any, coords: any) => void;
  children: (
    data: {
      onChange: (values: string) => void;
      onSelect: (values: any) => void;
      suggestions: any;
      loading: boolean;
    }
  ) => JSX.Element | null;
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export class PlacesController extends React.PureComponent<Props, State> {
  state = {
    gmapsLoaded: false,
    suggestions: [],
    loading: false
  };

  private mounted: boolean = false;
  private autocompleteService: any;
  private autocompleteOK: any;
  private geocoder: any;
  private geocoderOK: any;

  initMap = () => {
    this.setState({
      gmapsLoaded: true
    });

    this.autocompleteService = new window.google.maps.places.AutocompleteService();
    this.autocompleteOK = window.google.maps.places.PlacesServiceStatus.OK;
    this.geocoder = new window.google.maps.Geocoder();
    this.geocoderOK = window.google.maps.GeocoderStatus.OK;
  };

  componentDidMount() {
    this.mounted = true;
    window.initMap = this.initMap;

    const existingGmap = document.getElementById("gmapsAPI");
    if (existingGmap) {
      this.initMap();
      return;
    }

    const gmapScriptEl = document.createElement(`script`);
    gmapScriptEl.setAttribute("id", "gmapsAPI");
    gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAJe9WZfnVnav8jYAc1xEnm0AMKGhrCnH0&libraries=places&callback=initMap`;
    const body = document.querySelector(`body`);

    if (!body) {
      return;
    }

    body.insertAdjacentElement(`beforeend`, gmapScriptEl);
  }

  autoCompleteCallback = (predictions: any, status: any) => {
    if (!this.mounted) {
      return;
    }
    this.setState({ loading: false });
    if (status !== this.autocompleteOK) {
      console.log("ERROR!");
      return;
    }

    this.setState({
      suggestions: predictions.map((p: any, idx: any) => {
        return {
          id: p.id,
          description: p.description,
          placeId: p.place_id,
          index: idx,
          matchedSubstrings: p.matched_substrings,
          terms: p.terms,
          types: p.types
        };
      })
    });
  };

  fetchPredictions = (value: string) => {
    if (value.length > 2) {
      this.setState({ loading: true });
      this.autocompleteService.getPlacePredictions(
        {
          input: value
        },
        this.autoCompleteCallback
      );
    }
  };

  clearSuggestions = () => {
    this.setState({ suggestions: [] });
  };

  geocodeAddress = (address: any) => {
    return new Promise((resolve, reject) => {
      this.geocoder.geocode({ address }, (results: any, status: any) => {
        if (status !== this.geocoderOK) {
          reject(status);
        }
        resolve(results);
      });
    });
  };

  getLatLng = (result: any) => {
    return new Promise((resolve, reject) => {
      try {
        const latLng = {
          lat: result.geometry.location.lat(),
          lng: result.geometry.location.lng()
        };
        resolve(latLng);
      } catch (e) {
        reject(e);
      }
    });
  };

  onChange = (value: string) => {
    this.props.onChange(value);
    this.fetchPredictions(value);
  };

  onSelect = async (value: string) => {
    this.clearSuggestions();

    const address = await this.geocodeAddress(value);
    if (address) {
      const coords = await this.getLatLng(address[0]);
      this.props.onSelect(address, coords);
    }
  };

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { gmapsLoaded, suggestions, loading } = this.state;

    if (!gmapsLoaded) {
      return null;
    }

    return this.props.children({
      onChange: this.onChange,
      onSelect: this.onSelect,
      suggestions,
      loading
    });
  }
}
