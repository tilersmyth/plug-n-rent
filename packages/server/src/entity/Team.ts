import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne
} from "typeorm";
import { Location } from "./Location";

@Entity("teams")
export class Team extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("text") role: string;

  @ManyToOne(() => Location, (location: any) => location.teams)
  location: Location;
}
