import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable
} from "typeorm";
import { CatRelationship } from "./Category/CatRelationship";
import { Location } from "./Location";
import { Pricing } from "./Pricing";

@Entity("products")
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("text") name: string;

  @Column("text") slug: string;

  @Column({ nullable: true })
  importId: string;

  @ManyToMany(() => Pricing)
  @JoinTable({ name: "product_pricing" })
  pricings: Pricing[];

  @ManyToOne(() => Location, (location: any) => location.products)
  location: Location;

  @OneToMany(() => CatRelationship, catRelationship => catRelationship.product)
  catRelationships: CatRelationship[];
}
