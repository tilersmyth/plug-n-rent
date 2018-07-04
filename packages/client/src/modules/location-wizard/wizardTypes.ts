interface Company {
  id: string;
  name: string;
}

export interface AddressType {
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
