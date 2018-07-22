import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { Location } from "./Location";
import { Pricing } from "./Pricing";
import { CatRelationship } from "./Category/CatRelationship";

@Entity("products")
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column() name: string;

  @Column() slug: string;

  @Column() active: boolean;

  @Column({ nullable: true })
  importId: string;

  @ManyToMany(() => Pricing)
  @JoinTable({ name: "product_pricing" })
  pricings: Pricing[];

  @ManyToOne(() => Location, (location: any) => location.products)
  location: Location;

  @OneToMany(() => CatRelationship, catRelationship => catRelationship.product)
  catRelationships: CatRelationship[];

  @CreateDateColumn() createdAt: Date;

  @UpdateDateColumn() updatedAt?: Date;
}
