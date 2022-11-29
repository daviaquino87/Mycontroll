import { AppdataSource } from "../../../database/data-source";
import { Transaction } from "../../../database/entities/Transaction";
import { User } from "../../../database/entities/User";
import { ErrorPrivate } from "../../../utils/ExceptionError";

export class ListMontantService {
  async list(user_id: User) {
    const transactionService = AppdataSource.getRepository(Transaction);
    const userSevice = AppdataSource.getRepository(User);

    const user = await userSevice.findOneBy({ id: Number(user_id) });

    if (!user) {
      throw new ErrorPrivate("Not found!", 404, true);
    }

    const transactions = await transactionService.find({
      where: {
        user: {
          id: Number(user_id),
        },
      },
      order: {
        id: {
          direction: "DESC",
        },
      },
    });

    let montant = 0;

    transactions.map((transaction) => {
      if (transaction.type == "buy") {
        montant -= transaction.value;
      }
      if (transaction.type == "deposite") {
        montant += transaction.value;
      }
    });

    return montant;
  }
}
