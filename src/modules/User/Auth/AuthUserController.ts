import { Request, Response } from "express";
import { ErrorPrivate } from "../../../utils/ExceptionError";
import { AuthUserService } from "./AuthUserService";

export class AuthUserController {
  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    const authService = new AuthUserService();

    if (!email || !password) {
      throw new ErrorPrivate("Not found!", 404);
    }

    const data = await authService.login(email, password);

    return response.json(data);
  }

  async logout(request: Request, response: Response) {
    const authService = new AuthUserService();

    const { authorization } = request.headers;

    if (!authorization) {
      throw new ErrorPrivate("Unauthorized!", 401);
    }

    const token = String(authorization).split(" ");

    await authService.logout(token[1]);

    return response.json({ info: "successfully logged out!" });
  }
}
