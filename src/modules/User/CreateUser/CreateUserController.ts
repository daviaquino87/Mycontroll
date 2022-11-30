import { Request, Response } from "express";
import { checkUserData, validateCpf } from "../../../utils/CheckUserData";
import { ErrorPrivate } from "../../../utils/ExceptionError";
import { CreateUserService } from "./CreateUserService";
import bcrypt from "bcrypt";

export class CreateUserController {
  async create(request: Request, response: Response) {
    let { name, email, cpf, password } = request.body;

    if (!name || !email || !cpf || !password) {
      throw new ErrorPrivate("Not found!", 404, true);
    }

    await checkUserData(cpf, email);

    cpf = String(validateCpf(cpf));
    const passwordhash = await bcrypt.hash(password, 10);

    const createUserService = new CreateUserService();
    const data = await createUserService.createUser({
      name,
      email,
      password: passwordhash,
      cpf,
    });

    return response.json(data);
  }
}
