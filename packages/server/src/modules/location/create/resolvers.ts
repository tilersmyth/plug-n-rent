import { ResolverMap } from "../../../types/graphql-utils";
import { Company } from "../../../entity/Company";
import { Location } from "../../../entity/Location";
import { Team } from "../../../entity/Team";
import { User } from "../../../entity/User";

export const resolvers: ResolverMap = {
  Mutation: {
    createLocation: async (_, args: any, { session }) => {
      if (!session.userId) {
        throw new Error("not authenticated");
      }

      const user = await User.findOne({ where: { id: session.userId } });

      if (!user) {
        throw new Error("not authenticated");
      }

      const { locationId, name, companyId } = args;

      const existingLocation = await Location.findOne({
        where: { id: locationId, companyId }
      });

      if (existingLocation) {
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
        id: locationId,
        name,
        company
      });

      const response = await location.save();

      const team = Team.create({
        role: "admin",
        location: response,
        user
      });

      await team.save();

      return {
        ok: true,
        location: response
      };
    }
  }
};
