import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity("addresses")
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("text") address: string;

  @Column("text") address2: string;

  @Column("text") city: string;

  @Column("text") state: string;

  @Column("text") postalCode: string;

  @Column("text") lat: string;

  @Column("text") lng: string;

  @Column("text") phone: string;
}
