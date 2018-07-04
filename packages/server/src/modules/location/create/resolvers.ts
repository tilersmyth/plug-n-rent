import { ResolverMap } from "../../../types/graphql-utils";
import { Company } from "../../../entity/Company";
import { Location } from "../../../entity/Location";

export const resolvers: ResolverMap = {
  Mutation: {
    createLocation: async (_, args: any) => {
      const { locationId, name, companyId } = args;

      if (locationId) {
        const existingLocation = await Location.findOne({
          where: { id: locationId, companyId }
        });

        if (!existingLocation) {
          return {
            ok: false,
            errors: [
              {
                path: "location",
                message: "unable to update location values"
              }
            ]
          };
        }

        existingLocation.name = name;

        const updatedLocation = await existingLocation.save();

        return {
          ok: true,
          location: updatedLocation
        };
      }

      const company = await Company.findOne({
        where: { id: companyId }
      });

      if (!company) {
        return {
          ok: false,
          errors: [
            {
              path: "company",
              message: "unable to find specified company"
            }
          ]
        };
      }

      const location = Location.create({
        name,
        company
      });

      const response = await location.save();

      return {
        ok: true,
        location: response
      };
    }
  }
};
