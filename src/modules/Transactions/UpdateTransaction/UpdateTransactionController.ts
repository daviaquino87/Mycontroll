import { Request, Response } from "express";
import { UpdateTransactionService } from "./UpdateTransactionService";

export class UpdateTransactionController {
  async update(request: Request, response: Response) {
    const { user_id, ...rest } = request.body;
    const { transacion_id } = request.params;
    if (!transacion_id || !user_id) {
      return response
        .status(400)
        .json({ info: "the field transacion_id must be filled in!" });
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
