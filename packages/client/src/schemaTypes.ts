

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateCompanyMutation
// ====================================================

export interface CreateCompanyMutation_createCompany_errors {
  path: string;
  message: string;
}

export interface CreateCompanyMutation_createCompany_company {
  id: string;
}

export interface CreateCompanyMutation_createCompany {
  errors: CreateCompanyMutation_createCompany_errors[] | null;
  company: CreateCompanyMutation_createCompany_company | null;
}

export interface CreateCompanyMutation {
  createCompany: CreateCompanyMutation_createCompany;
}

export interface CreateCompanyMutationVariables {
  name: string;
  domain: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LocationAuthByTeamQuery
// ====================================================

export interface LocationAuthByTeamQuery_locationAuthByTeam {
  id: string | null;
}

export interface LocationAuthByTeamQuery {
  locationAuthByTeam: LocationAuthByTeamQuery_locationAuthByTeam;
}

export interface LocationAuthByTeamQueryVariables {
  locationId?: string | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserCompanyAuthQuery
// ====================================================

export interface UserCompanyAuthQuery_userCompanies {
  id: string;
}

export interface UserCompanyAuthQuery {
  userCompanies: UserCompanyAuthQuery_userCompanies[];
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: WizardQuery
// ====================================================

export interface WizardQuery_verifyWizard_location_company {
  id: string;
  name: string;
}

export interface WizardQuery_verifyWizard_location_address {
  id: string | null;
  address: string;
  address2: string | null;
  city: string;
  state: string;
  postalCode: string;
  lat: number;
  lng: number;
  phone: string;
}

export interface WizardQuery_verifyWizard_location {
  id: string;
  name: string;
  company: WizardQuery_verifyWizard_location_company;
  address: WizardQuery_verifyWizard_location_address | null;
}

export interface WizardQuery_verifyWizard {
  location: WizardQuery_verifyWizard_location | null;
}

export interface WizardQuery {
  verifyWizard: WizardQuery_verifyWizard;
}

export interface WizardQueryVariables {
  companyId: string;
  locationId?: string | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SelectUserCompaniesQuery
// ====================================================

export interface SelectUserCompaniesQuery_userCompanies {
  id: string;
  name: string;
}

export interface SelectUserCompaniesQuery {
  userCompanies: SelectUserCompaniesQuery_userCompanies[];
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LocationMutation
// ====================================================

export interface LocationMutation_createLocation_location {
  id: string;
  name: string;
}

export interface LocationMutation_createLocation_errors {
  path: string;
  message: string;
}

export interface LocationMutation_createLocation {
  ok: boolean;
  location: LocationMutation_createLocation_location | null;
  errors: LocationMutation_createLocation_errors[] | null;
}

export interface LocationMutation {
  createLocation: LocationMutation_createLocation;
}

export interface LocationMutationVariables {
  locationId?: string | null;
  name: string;
  companyId: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddressMutation
// ====================================================

export interface AddressMutation_createAddress_address {
  id: string | null;
  address: string;
  address2: string | null;
  city: string;
  state: string;
  postalCode: string;
  lat: number;
  lng: number;
  phone: string;
}

export interface AddressMutation_createAddress_errors {
  path: string;
  message: string;
}

export interface AddressMutation_createAddress {
  ok: boolean;
  address: AddressMutation_createAddress_address | null;
  errors: AddressMutation_createAddress_errors[] | null;
}

export interface AddressMutation {
  createAddress: AddressMutation_createAddress;
}

export interface AddressMutationVariables {
  locationId?: string | null;
  id?: string | null;
  address: string;
  address2?: string | null;
  city: string;
  state: string;
  postalCode: string;
  lat: number;
  lng: number;
  phone: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================