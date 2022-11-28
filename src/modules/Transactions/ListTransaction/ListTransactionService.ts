import { AppdataSource } from "../../../database/data-source";
import { Transaction } from "../../../database/entities/Transaction";
import { User } from "../../../database/entities/User";
import { ErrorPrivate } from "../../../utils/ExceptionError";

export class ListTransactionService {
  async list(user_id: User) {
    const transactionService = AppdataSource.getRepository(Transaction);
    const userSevice = AppdataSource.getRepository(User);

    const user = await userSevice.findOneBy({ id: Number(user_id) });

    if (!user) {
      throw new ErrorPrivate("Not found!", 404);
    }

    const transactions = await transactionService.findBy({
      user: { id: Number(user_id) },
    });

    return transactions;
  }
}
