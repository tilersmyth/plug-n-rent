interface Company {
  id: string;
  name: string;
}

interface AddressType {
  id?: string;
  address: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  lat: string;
  lng: string;
  phone?: string;
}

export interface LocationType {
  id: string;
  name: string;
  company: Company;
  address: AddressType;
}

export interface AddressSuggestions {
  id?: string;
  description: string;
  placeId: string;
  index: number;
  matchedSubstrings: google.maps.places.PredictionSubstring[];
  terms: google.maps.places.PredictionTerm[];
  types: string[];
}
