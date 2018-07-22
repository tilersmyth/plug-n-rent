import { ResolverMap } from "../../../types/graphql-utils";
import { Company } from "../../../entity/Company";

export const resolvers: ResolverMap = {
  Query: {
    company: async (_, args: any) => {
      const { id } = args;
      return Company.findOne({ where: { id } });
    }
  }
};
