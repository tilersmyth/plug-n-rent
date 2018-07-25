import { ResolverMap } from "../../../types/graphql-utils";
import { Company } from "../../../entity/Company";
import { User } from "../../../entity/User";

export const resolvers: ResolverMap = {
  Mutation: {
    createCompany: async (_, args: any, { session }) => {
      const { name, domain } = args;

      if (!session.userId) {
        throw new Error("not authenticated");
      }

      const domainAlreadyExists = await Company.findOne({
        where: { domain },
        select: ["id"]
      });

      if (domainAlreadyExists) {
        return {
          errors: [
            {
              path: "domain",
              message: "an account already exists for this domain"
            }
          ]
        };
      }

      const user = await User.findOne({ where: { id: session.userId } });

      if (!user) {
        throw new Error("user does not exist!");
      }

      const company = Company.create({
        name,
        domain,
        slug: "test.com"
      });

      company.owners = [user];

      const savedCompany = await company.save();

      return { company: savedCompany };
    }
  }
};
