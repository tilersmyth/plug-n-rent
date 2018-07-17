import { getConnectionOptions, createConnection } from "typeorm";
import { User } from "../entity/User";
import { Category } from "../entity/Category/Category";
import { CatRelationship } from "../entity/Category/CatRelationship";
import { Address } from "../entity/Address";
import { Company } from "../entity/Company";
import { Location } from "../entity/Location";
import { Pricing } from "../entity/Pricing";
import { Product } from "../entity/Product";
import { Team } from "../entity/Team";

export const createTypeormConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  return process.env.NODE_ENV === "production"
    ? createConnection({
        ...connectionOptions,
        url: process.env.DATABASE_URL,
        entities: [
          User,
          Category,
          CatRelationship,
          Address,
          Company,
          Location,
          Pricing,
          Product,
          Team
        ],
        name: "default"
      } as any)
    : createConnection({
        ...connectionOptions,
        name: "default"
      });
};
