import { Request, Response } from "express";
import { ErrorPrivate } from "../../../utils/ExceptionError";
import { DeleteTransactionService } from "./DeleteTransactionService";

export class DeleteTransactionController {
  async delete(request: Request, response: Response) {
    const user_id = request.user.id;
    const { id } = request.params;

    if (!user_id || !id) {
      throw new ErrorPrivate("Not found!", 404);
    }

    const transactionService = new DeleteTransactionService();

    const data = await transactionService.delete(Number(id), user_id);

    return response.json(data);
  }
}
