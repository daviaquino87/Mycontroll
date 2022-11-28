import { AppdataSource } from "../../../database/data-source";
import { Transaction } from "../../../database/entities/Transaction";
import { User } from "../../../database/entities/User";
import { ErrorPrivate } from "../../../utils/ExceptionError";
import { TransactionInterface } from "./interface/CreateTransactionInterface";

export class CreateTransactionService {
  async create({
    value,
    type,
    description = "",
    user_id,
  }: TransactionInterface) {
    const transactionService = AppdataSource.getRepository(Transaction);
    const userService = AppdataSource.getRepository(User);

    const user = await userService.findOneBy({ id: user_id });

    if (!user) {
      throw new ErrorPrivate("Not found!", 400);
    }

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
