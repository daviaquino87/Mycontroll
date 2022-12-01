import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "./Transaction";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text", unique: true })
  email: string;

  @Column({ type: "text", unique: true })
  cpf: string;

  @Column({ type: "text" })
  password: string;

  @OneToMany(() => Transaction, (user) => user.user, { cascade: true })
  transactions: Transaction[];
}
