import * as uuidv4 from "uuid/v4";
import * as validate from "uuid-validate";

import { ResolverMap } from "../../../types/graphql-utils";
import { Company } from "../../../entity/Company";
import { Location } from "../../../entity/Location";

export const resolvers: ResolverMap = {
  Query: {
    verifyWizard: async (_, args: any) => {
      const { companyId, locationId } = args;

      const company = await Company.findOne({ where: { id: companyId } });

      if (!locationId) {
        return {
          location: {
            id: uuidv4(),
            name: "",
            company
          }
        };
      }

      const location = await Location.findOne({
        where: { id: locationId, companyId },
        relations: ["company", "address"]
      });

      if (!location && validate(locationId)) {
        return {
          location: {
            id: locationId,
            name: "",
            company
          }
        };
      }

      return {
        location
      };
    }
  }
};
