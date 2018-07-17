import {
  Entity,
  Column,
  BaseEntity,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Product } from "../Product";
import { Category } from "./Category";

@Entity("catRelationships")
export class CatRelationship extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("text") catOrder: number;

  @ManyToOne(() => Product, (product: any) => product.catRelationships)
  product: Product;

  @ManyToOne(() => Category, (category: any) => category.catRelationships)
  category: Category;
}
