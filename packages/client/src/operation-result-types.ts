/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface UserCompanyQueryQuery {
  userCompanies:  Array< {
    id: string,
    name: string,
  } >,
};

export interface LocationMutationMutationVariables {
  locationId?: string | null,
  name: string,
  companyId: string,
};

export interface LocationMutationMutation {
  createLocation:  {
    ok: boolean,
    location:  {
      id: string | null,
      name: string | null,
    } | null,
    errors:  Array< {
      path: string,
      message: string,
    } > | null,
  },
};
