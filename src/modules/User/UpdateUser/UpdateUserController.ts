import { Request, Response } from "express";
import { ErrorPrivate } from "../../../utils/ExceptionError";
import { UpdateUserService } from "./UpdateUserService";

export class UpdateUserController {
  async update(request: Request, response: Response) {
    const user_id = request.user.id;
    const { name, email, password } = request.body;

    if (!user_id) {
      throw new ErrorPrivate("Not found!", 404, true);
    }

    const updateTransaction = new UpdateUserService();
    const data = await updateTransaction.update(user_id, {
      name,
      email,
      password,
    });

    return response.json(data);
  }
}
