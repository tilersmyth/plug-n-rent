import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne
} from "typeorm";
import { Location } from "../Location";
import { CatRelationship } from "./CatRelationship";

@Entity("categories")
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column() name: string;

  @Column() slug: string;

  @Column() taxonomy: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 0 })
  count: number;

  @ManyToOne(() => Category, category => category.children)
  parent: Category;

  @OneToMany(() => Category, category => category.parent)
  children: Category[];

  @ManyToOne(() => Location, (location: any) => location.products)
  location: Location;

  @OneToMany(() => CatRelationship, catRelationship => catRelationship.category)
  catRelationship: CatRelationship[];
}
