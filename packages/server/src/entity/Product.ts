import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne
} from "typeorm";
import { CatRelationship } from "./Category/CatRelationship";
import { Location } from "./Location";

@Entity("products")
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("text") name: string;

  @Column("text") slug: string;

  @Column({ nullable: true })
  importId: string;

  @ManyToOne(() => Location, (location: any) => location.products)
  location: Location;

  @OneToMany(() => CatRelationship, catRelationship => catRelationship.products)
  catRelationship: CatRelationship[];
}
