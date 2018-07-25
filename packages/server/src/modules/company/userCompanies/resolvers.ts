import { ResolverMap } from "../../../types/graphql-utils";
import { Company } from "../../../entity/Company";

export const resolvers: ResolverMap = {
  Query: {
    userCompanies: async (_, __, { session }) => {
      if (!session.userId) {
        throw new Error("not authorized");
      }

      const companies = await Company.createQueryBuilder("company")
        .leftJoinAndSelect("company.owners", "owners")
        .where("owners.id IN(:ids)", { ids: session.userId })
        .getMany();

      return companies;
    }
  }
};
