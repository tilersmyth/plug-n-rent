import { CatRelationship } from "../../../entity/Category/CatRelationship";

export const insertCatRelationship = (product: any, category: any) => {
  const catRelationship = new CatRelationship();
  catRelationship.products = product;
  catRelationship.categories = category;
  catRelationship.catOrder = 0;

  return catRelationship;
};
