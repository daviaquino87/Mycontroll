import { Request, Response } from "express";
import { ListTransactionService } from "./ListTransactionService";

export class ListTransactionController {
  async list(request: Request, response: Response) {
    const { user_id } = request.body;

    try {
      const listTransaction = new ListTransactionService();
      const data = await listTransaction.list(user_id);

      return response.json(data);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ info: "internal error server!" });
    }
  }
}
