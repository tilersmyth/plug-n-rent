import { ResolverMap } from "../../../types/graphql-utils";
import { Company } from "../../../entity/Company";

export const resolvers: ResolverMap = {
  Query: {
    allCompanies: async _ => {
      const companies = await Company.find();
      return companies;
    }
  }
};
