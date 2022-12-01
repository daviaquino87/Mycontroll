import { Request, Response } from "express";
import { ErrorPrivate } from "../../../utils/ExceptionError";
import { DeleteUserService } from "./DeleteUserService";

export class DeleteUserController {
  async delete(request: Request, response: Response) {
    const user_id = request.user.id;
    const { authorization } = request.headers;

    if (!user_id) {
      throw new ErrorPrivate("Not found!", 404, true);
    }

    const token = String(authorization).split(" ");

    const userService = new DeleteUserService();

    const data = await userService.delete(user_id, token[1]);

    if (!data) {
      throw new ErrorPrivate("Not found!", 404, true);
    }

    return response.json({ info: "User removed successfully!" });
  }
}
