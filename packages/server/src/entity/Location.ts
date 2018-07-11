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

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;
}
