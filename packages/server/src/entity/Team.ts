import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne
} from "typeorm";
import { Company } from "./Company";

@Entity("teams")
export class Team extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("text") role: string;

  @ManyToOne(() => Company, (company: any) => company.teams)
  company: Company;
}
