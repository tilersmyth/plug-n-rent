import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable
} from "typeorm";

import { Location } from "./Location";
import { User } from "./User";

@Entity("companies")
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("text") name: string;

  @Column() domain: string;

  @Column("text") slug: string;

  @ManyToMany(() => User)
  @JoinTable({ name: "company_owners" })
  owners: User[];

  @OneToMany(() => Location, location => location.company)
  locations: Location[];
}
