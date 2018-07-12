import { Request, Response } from "express";
import * as request from "request";
import * as csv from "fast-csv";
import { getConnection } from "typeorm";

import { Product } from "../../entity/Product";
import { Category } from "../../entity/Category/Category";
import { CatRelationship } from "../../entity/Category/CatRelationship";

// utils
import { slugGenerator } from "../../utils/slugGenerator";
import { csvSchema } from "./csvSchemaValidation";

const insert = async (data: any, locationId: any) => {
  console.log(data);
  await getConnection().transaction(async transactionalEntityManager => {
    const checkProduct = await Product.findOne({
      where: { locationId, importId: data.unique_id }
    });

    if (checkProduct) {
      return;
    }

    const productSlug = await slugGenerator(data.name, locationId, Product);

    const product = new Product();
    product.name = data.name;
    product.slug = productSlug;
    product.importId = data.index;
    product.location = locationId;

    const productSaved = await transactionalEntityManager.save(product);

    let checkCat = await Category.findOne({
      where: { locationId, name: data.category }
    });
    if (!checkCat) {
      const catSlug = await slugGenerator(data.category, locationId, Category);

      const category = new Category();
      category.name = data.category;
      category.slug = catSlug;
      category.taxonomy = "category";
      category.location = locationId;

      checkCat = await transactionalEntityManager.save(category);
    }
    const checkType = await Category.findOne({
      where: { locationId, name: data.product_type }
    });

    if (!checkType) {
      const typeSlug = await slugGenerator(
        data.product_type,
        locationId,
        Category
      );
      const productType = new Category();
      productType.name = data.product_type;
      productType.slug = typeSlug;
      productType.taxonomy = "product_type";
      productType.parent = checkCat;
      productType.location = locationId;
      await transactionalEntityManager.save(productType);
    }

    const catRelationship = new CatRelationship();
    catRelationship.products = productSaved;
    catRelationship.categories = checkCat;
    catRelationship.catOrder = 0;

    await transactionalEntityManager.save(catRelationship);

    return true;
  });
};

export const csvImport = async (req: Request, res: Response) => {
  const stream = request.get(req.file.path);

  let counter = 0;

  const csvStream = csv
    .parse({ headers: true })
    .validate(async (data: any, next: any) => {
      const valid = await csvSchema.isValid(data);
      if (!valid) {
        next(new Error());
      }
      next(null, data);
    })
    .on("data", async record => {
      csvStream.pause();

      if (counter < 100) {
        await insert(record, req.body.locationId);
        ++counter;
      }

      csvStream.resume();
    })
    .on("end", () => {
      res.send({ success: true });
    })
    .on("error", () => {
      res.send({ success: false, path: "upload_error" });
    });

  stream.pipe(csvStream);
};
