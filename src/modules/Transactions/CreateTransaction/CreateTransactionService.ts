import { AppdataSource } from "../../../database/data-source";
import { Transaction } from "../../../database/entities/Transaction";
import { TransactionInterface } from "./interface/CreateTransactionInterface";

export class CreateTransactionService {
  async create({
    value,
    type,
    description = "",
    user_id,
  }: TransactionInterface) {
    const transactionService = AppdataSource.getRepository(Transaction);

    const newTransaction = transactionService.create({
      value,
      type,
      description,
      user: { id: user_id },
    });

    const data = await transactionService.save(newTransaction);

    return data;
  }
}
