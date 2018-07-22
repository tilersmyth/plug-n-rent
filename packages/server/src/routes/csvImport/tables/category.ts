import { Category } from "../../../entity/Category/Category";
import { slugGenerator } from "../../../utils/slugGenerator";

export const insertCategory = async (
  data: any,
  locationId: any,
  parentCat?: any
) => {
  const catData = parentCat ? data.product_type : data.product_category;

  let category = await Category.findOne({
    where: { locationId, name: catData }
  });

  if (!category) {
    const catSlug = await slugGenerator(catData, locationId, Category);

    category = new Category();
    category.name = catData;
    category.slug = catSlug;
    category.taxonomy = parentCat ? "product_type" : "category";
    category.location = locationId;
    category.parent = parentCat;
  }

  return category;
};
