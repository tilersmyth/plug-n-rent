import { Product } from "../../../entity/Product";
import { slugGenerator } from "../../../utils/slugGenerator";

export const insertProduct = async (data: any, locationId: any) => {
  const productExists = await Product.findOne({
    where: { location: locationId, importId: data.import_id }
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
  product.active = Boolean(data.product_active);
  product.importId = data.import_id;
  product.location = locationId;

  return product;
};
