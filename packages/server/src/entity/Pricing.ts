import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne
} from "typeorm";
import { Location } from "./Location";

@Entity("pricings")
export class Pricing extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column() interval: number;

  @Column() amount: number;

  @ManyToOne(() => Location, (location: any) => location.pricings)
  location: Location;
}
