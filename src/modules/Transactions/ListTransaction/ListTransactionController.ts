import { Request, Response } from "express";
import { ErrorPrivate } from "../../../utils/ExceptionError";
import { ListTransactionService } from "./ListTransactionService";

export class ListTransactionController {
  async list(request: Request, response: Response) {
    const user_id = request.user.id;

    if (!user_id) {
      throw new ErrorPrivate("Not found!", 404);
    }

    const listTransaction = new ListTransactionService();
    const data = await listTransaction.list(user_id);

    return response.json(data);
  }
}
