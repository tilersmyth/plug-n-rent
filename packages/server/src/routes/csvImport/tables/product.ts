import { Product } from "../../../entity/Product";
import { slugGenerator } from "../../../utils/slugGenerator";

export const insertProduct = async (data: any, locationId: any) => {
  const productExists = await Product.findOne({
    where: { locationId, importId: data.unique_id }
  });

  if (productExists) {
    return;
  }

  const productSlug = await slugGenerator(
    data.product_name,
    locationId,
    Product
  );

  const product = new Product();
  product.name = data.product_name;
  product.slug = productSlug;
  product.importId = data.index;
  product.location = locationId;

  return product;
};
