import { Request, Response } from "express";
import { ListTransactionService } from "./ListTransactionService";

export class ListTransactionController {
  async list(request: Request, response: Response) {
    const { user_id } = request.body;

    if (!user_id) {
      return response
        .status(400)
        .json({ info: "the field user_id must be filled in!" });
    }

    const listTransaction = new ListTransactionService();
    const data = await listTransaction.list(user_id);

    return response.json(data);
  }
}
