import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany
} from "typeorm";
import { Company } from "./Company";
import { Address } from "./Address";
import { Category } from "./Category/Category";
import { Product } from "./Product";
import { Pricing } from "./Pricing";
import { CatRelationship } from "./Category/CatRelationship";
import { Team } from "./Team";

@Entity("locations")
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("text") name: string;

  @ManyToOne(() => Company, (company: any) => company.locations)
  company: Company;

  @OneToMany(() => Category, category => category.location)
  categories: Category[];

  @OneToMany(() => Product, product => product.location)
  products: Product[];

  @OneToMany(() => Pricing, pricing => pricing.location)
  pricings: Pricing[];

  @OneToMany(() => CatRelationship, catRelationship => catRelationship.location)
  CatRelationships: CatRelationship[];

  @OneToMany(() => Team, team => team.location)
  teams: Team[];

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;
}
