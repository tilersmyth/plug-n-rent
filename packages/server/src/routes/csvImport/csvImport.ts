import { Request, Response } from "express";
import * as request from "request";
import * as csv from "fast-csv";
import { getConnection } from "typeorm";

// tables
import { insertProduct } from "./tables/product";
import { insertPricing } from "./tables/pricing";
import { insertCategory } from "./tables/category";
import { insertCatRelationship } from "./tables/catRelationship";

// utils
import { csvSchema } from "./utils/csvSchemaValidation";
import { fileDelete } from "./utils/fileDelete";

const insert = async (data: any, locationId: any) => {
  await getConnection().transaction(async transactionalEntityManager => {
    const product = await insertProduct(data, locationId);
    if (!product) {
      return;
    }

    const pricing = await insertPricing(data, locationId);
    if (pricing) {
      product.pricings = pricing;
      await transactionalEntityManager.save(product.pricings);
    }

    const productSaved = await transactionalEntityManager.save(product);

    let category = await insertCategory(data, locationId);

    if (category) {
      category = await transactionalEntityManager.save(category);
      const catRelationship = insertCatRelationship(productSaved, category);
      await transactionalEntityManager.save(catRelationship);
    }

    const productType = await insertCategory(data, locationId, category);
    if (productType) {
      await transactionalEntityManager.save(productType);
      const catRelationship = insertCatRelationship(productSaved, productType);
      await transactionalEntityManager.save(catRelationship);
    }

    return true;
  });
};

export const csvImport = async (req: Request, res: Response) => {
  const { file } = req;
  const stream = request.get(file.path);

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
    .on("end", async () => {
      await fileDelete(file.originalname);
      res.send({ success: true });
    })
    .on("error", async () => {
      await fileDelete(file.originalname);
      res.send({ success: false, path: "upload_error" });
    });

  stream.pipe(csvStream);
};
