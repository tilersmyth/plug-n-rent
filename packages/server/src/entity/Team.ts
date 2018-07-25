import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne
} from "typeorm";
import { Location } from "./Location";
import { User } from "./User";

@Entity("teams")
export class Team extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("text") role: string;

  @ManyToOne(() => User, (user: any) => user.teams)
  user: User;

  @ManyToOne(() => Location, (location: any) => location.teams)
  location: Location;
}
