import { CatRelationship } from "../../../entity/Category/CatRelationship";

export const insertCatRelationship = (
  locationId: any,
  product: any,
  category: any
) => {
  const catRelationship = new CatRelationship();
  catRelationship.location = locationId;
  catRelationship.product = product;
  catRelationship.category = category;
  catRelationship.catOrder = 0;

  return catRelationship;
};
