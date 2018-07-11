import { ResolverMap } from "../../../types/graphql-utils";
import { Product } from "../../../entity/Product";

export const resolvers: ResolverMap = {
  Mutation: {
    createProduct: async (_, args: any) => {
      const { name } = args;

      const product = Product.create({
        name
      });

      const response = await product.save();

      return {
        ok: true,
        product: response
      };
    }
  }
};
