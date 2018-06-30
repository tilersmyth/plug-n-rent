import { ResolverMap } from "../../../types/graphql-utils";
import { Company } from "../../../entity/Company";
import { Location } from "../../../entity/Location";

export const resolvers: ResolverMap = {
  Query: {
    verifyWizard: async (_, args: any) => {
      const { companyId, locationId } = args;

      if (!locationId) {
        const company = await Company.findOne({ where: { id: companyId } });

        return {
          location: {
            id: "",
            name: "",
            company
          }
        };
      }

      const location = await Location.findOne({
        where: { id: locationId, companyId },
        relations: ["company", "address"]
      });

      return {
        location
      };
    }
  }
};
