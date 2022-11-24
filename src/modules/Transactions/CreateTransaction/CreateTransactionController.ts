import { Request, Response } from "express";
import { CreateTransactionService } from "./CreateTransactionService";

export class CreateTransactionController {
  async create(request: Request, response: Response) {
    let { value, type, description, user_id } = request.body;

    if (!value || !type || !user_id) {
      return response
        .status(400)
        .json({ info: "all fields must be filled in!" });
    }

    try {
      const createTransaction = new CreateTransactionService();
      const data = await createTransaction.create({
        value,
        type,
        description,
        user_id,
      });

      return response.json(data);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ info: "internal error server!" });
    }
  }
}
