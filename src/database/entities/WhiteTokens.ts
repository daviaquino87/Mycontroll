import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity("tokens")
export class WhiteToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  userId: number;

  @Column({ type: "text" })
  token: string;
}
