import { ResolverMap } from "../../../types/graphql-utils";
import { Location } from "../../../entity/Location";
import { Address } from "../../../entity/Address";

export const resolvers: ResolverMap = {
  Mutation: {
    createAddress: async (_, args: any) => {
      const { locationId } = args;
      console.log("FIRE");

      if (args.id) {
        console.log("fired inside");
        const existingAddress = await Address.findOne({
          where: { id: args.id }
        });

        if (!existingAddress) {
          return {
            ok: false,
            errors: [
              {
                path: "address",
                message: "unable to update address values"
              }
            ]
          };
        }

        existingAddress.address = args.address;
        existingAddress.address2 = args.address2;
        existingAddress.city = args.city;
        existingAddress.state = args.state;
        existingAddress.postalCode = args.postalCode;
        existingAddress.lat = args.lat;
        existingAddress.lng = args.lng;
        existingAddress.phone = args.phone;

        const updated = await existingAddress.save();

        return {
          ok: true,
          address: updated
        };
      }

      const location = await Location.findOne({
        where: { id: locationId }
      });

      if (!location) {
        return {
          ok: false,
          errors: [
            {
              path: "location",
              message: "unable to find specified location"
            }
          ]
        };
      }

      const addressArgs = Address.create({
        ...args
      });

      const address = await addressArgs.save();

      location.address = address;

      await location.save();

      return {
        ok: true,
        address
      };
    }
  }
};
