import { join } from "path";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity("transactions")
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "float" })
  value: number;

  @Column({ type: "text" })
  type: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.transactions, { onDelete: "CASCADE" })
  user: User;
}
