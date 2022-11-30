import { Request, Response } from "express";
import { ErrorPrivate } from "../../../utils/ExceptionError";
import { DeleteUserService } from "./DeleteUserService";

export class DeleteUserController {
  async delete(request: Request, response: Response) {
    const user_id = request.user.id;

    if (!user_id) {
      throw new ErrorPrivate("Not found!", 404, true);
    }

    const userService = new DeleteUserService();

    const data = await userService.delete(user_id);

    return response.json(data);
  }
}
