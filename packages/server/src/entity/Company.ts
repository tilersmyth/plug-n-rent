import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany
} from "typeorm";

import { Team } from "./Team";

@Entity("companies")
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("text") name: string;

  @Column("text") slug: string;

  @Column("text") domain: string;

  @OneToMany(() => Team, team => team.company)
  teams: Team[];
}
