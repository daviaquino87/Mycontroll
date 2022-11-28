import { Request, Response } from "express";
import { cp } from "fs";
import { checkUserData, validateCpf } from "../../../utils/CheckUserData";
import { ErrorPrivate } from "../../../utils/ExceptionError";
import { CreateUserService } from "./CreateUserService";

export class CreateUserController {
  async create(request: Request, response: Response) {
    let { name, email, cpf, password } = request.body;

    if (!name || !email || !cpf || !password) {
      throw new ErrorPrivate("Not found!", 404, true);
    }

    await checkUserData(cpf, email);

    cpf = String(validateCpf(cpf));

    const createUserService = new CreateUserService();
    const data = await createUserService.createUser({
      name,
      email,
      password,
      cpf,
    });

    return response.json(data);
  }
}
