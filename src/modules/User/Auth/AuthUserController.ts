import { Request, Response } from "express";
import { ErrorPrivate } from "../../../utils/ExceptionError";
import { AuthUserService } from "./AuthUserService";

export class AuthUserController {
  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    const authService = new AuthUserService();

    if (!email || !password) {
      throw new ErrorPrivate("Not found!", 404, true);
    }

    const data = await authService.login(email, password);

    return response.json(data);
  }
}
