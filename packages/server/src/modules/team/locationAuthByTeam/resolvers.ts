import { ResolverMap } from "../../../types/graphql-utils";
import { Team } from "../../../entity/Team";

export const resolvers: ResolverMap = {
  Query: {
    locationAuthByTeam: async (_, args: any, { session }) => {
      if (!session.userId) {
        throw new Error("not authenticated");
      }

      const { locationId } = args;

      if (locationId) {
        const team = await Team.findOne({
          where: { location: locationId, user: session.userId }
        });

        if (team) {
          return { id: locationId };
        }
      }

      const findTeam = await Team.findOne({
        where: { user: session.userId },
        relations: ["location"]
      });

      if (findTeam) {
        return { id: findTeam.location.id };
      }

      return {
        id: null
      };
    }
  }
};
