import { AppdataSource } from "../../../database/data-source";
import { Transaction } from "../../../database/entities/Transaction";
import { User } from "../../../database/entities/User";

export class ListTransactionService {
  async list(user_id: User) {
    const transactionService = AppdataSource.getRepository(Transaction);

    try {
      const transactions = await transactionService.findBy({
        user: { id: Number(user_id) },
      });

      return transactions;
    } catch (error) {
      return error;
    }
  }
}
