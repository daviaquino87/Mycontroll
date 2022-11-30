import { AppdataSource } from "../../../database/data-source";
import { Transaction } from "../../../database/entities/Transaction";
import { User } from "../../../database/entities/User";
import { ErrorPrivate } from "../../../utils/ExceptionError";

export class UpdateTransactionService {
  async update(id: number, user_id: number, data: User) {
    const transactionService = AppdataSource.getRepository(Transaction);

    const transaction = await transactionService.findOne({
      where: {
        user: {
          id: Number(user_id),
        },
        id: Number(id),
      },
    });

    if (!transaction) {
      throw new ErrorPrivate("Not found!", 404, true);
    }

    await transactionService.update(id, { ...data });

    return transaction;
  }
}
