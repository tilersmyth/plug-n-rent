import { ResolverMap } from "../../../types/graphql-utils";
import { Company } from "../../../entity/Company";
import { Team } from "../../../entity/Team";

export const resolvers: ResolverMap = {
  Mutation: {
    createCompany: async (_, args: any) => {
      const { name, slug, domain } = args;

      const domainAlreadyExists = await Company.findOne({
        where: { domain },
        select: ["id"]
      });

      if (domainAlreadyExists) {
        return [
          {
            path: "domain",
            message: "an account already exists for this domain"
          }
        ];
      }

      const company = Company.create({
        name,
        slug,
        domain
      });

      await company.save();

      const team = Team.create({
        role: "admin",
        company
      });

      await team.save();

      return null;
    }
  }
};
