import { ResolverMap } from "../../../types/graphql-utils";
import { Company } from "../../../entity/Company";

export const resolvers: ResolverMap = {
  Query: {
    checkCompanySlug: async (_, { slug }) => {
      const isAvail = await Company.findOne({ where: { slug } });
      return !isAvail;
    }
  }
};
