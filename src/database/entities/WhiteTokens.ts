import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tokens")
export class WhiteToken {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "text" })
  token: string;
}
