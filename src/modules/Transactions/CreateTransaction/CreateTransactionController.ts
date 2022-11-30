import { Request, Response } from "express";
import { ErrorPrivate } from "../../../utils/ExceptionError";
import { CreateTransactionService } from "./CreateTransactionService";

export class CreateTransactionController {
  async create(request: Request, response: Response) {
    let { value, type, description } = request.body;
    const user_id = request.user.id;

    if (!value || !type || !user_id) {
      throw new ErrorPrivate("all fields must be filled in!", 400, true);
    }

    if (type != "buy" && type != "deposite") {
      throw new ErrorPrivate("Not found", 404, true);
    }

    const createTransaction = new CreateTransactionService();
    const data = await createTransaction.create({
      value,
      type,
      description,
      user_id,
    });

    return response.json(data);
  }
}
