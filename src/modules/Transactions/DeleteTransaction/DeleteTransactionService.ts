import { AppdataSource } from "../../../database/data-source";
import { Transaction } from "../../../database/entities/Transaction";
import { ErrorPrivate } from "../../../utils/ExceptionError";

export class DeleteTransactionService {
  async delete(id: number, user_id: number) {
    const transactionService = AppdataSource.getRepository(Transaction);

    const transaction = await transactionService.findOne({
      where: {
        user: {
          id: user_id,
        },
        id: id,
      },
    });

    if (!transaction) {
      throw new ErrorPrivate("Not found!", 404, true);
    }

    await transactionService.delete(id);

    return transaction;
  }
}
