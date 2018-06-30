import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne
} from "typeorm";
import { Company } from "./Company";
import { Address } from "./Address";

@Entity("locations")
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("text") name: string;

  @ManyToOne(() => Company, (company: any) => company.locations)
  company: Company;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;
}
