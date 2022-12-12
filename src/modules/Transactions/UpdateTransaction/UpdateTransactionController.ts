import { Request, Response } from "express";
import { ErrorPrivate } from "../../../utils/ExceptionError";
import { UpdateTransactionService } from "./UpdateTransactionService";

export class UpdateTransactionController {
  async update(request: Request, response: Response) {
    const user_id = request.user.id;
    const { ...rest } = request.body;
    const { transacion_id } = request.params;
    if (!transacion_id || !user_id) {
      throw new ErrorPrivate("Not found!", 404);
    }

    const updateTransaction = new UpdateTransactionService();
    const data = await updateTransaction.update(
      Number(transacion_id),
      user_id,
      rest
    );

    return response.json(data);
  }
}
