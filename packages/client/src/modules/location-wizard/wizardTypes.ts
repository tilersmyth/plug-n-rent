interface Company {
  id: string;
  name: string;
}

interface Address {
  id: string;
  name: string;
}

export interface LocationType {
  id: string;
  name: string;
  company: Company;
  address: Address;
}
