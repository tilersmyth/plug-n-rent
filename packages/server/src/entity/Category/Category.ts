import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne
} from "typeorm";
import { CatRelationship } from "./CatRelationship";
import { Location } from "../Location";

@Entity("categories")
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("text") name: string;

  @Column("text") slug: string;

  @Column("text") taxonomy: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Category, category => category.children)
  parent: Category;

  @OneToMany(() => Category, category => category.parent)
  children: Category[];

  @ManyToOne(() => Location, (location: any) => location.products)
  location: Location;

  @OneToMany(
    () => CatRelationship,
    catRelationship => catRelationship.categories
  )
  catRelationship: CatRelationship[];
}
