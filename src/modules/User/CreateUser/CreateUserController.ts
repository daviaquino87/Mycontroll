import { Request, Response } from "express";
import { checkUserData } from "../../../utils/CheckUserData";
import { CreateUserService } from "./CreateUserService";

export class CreateUserController {
  async create(request: Request, response: Response) {
    let { name, email, cpf, password } = request.body;

    if (!name || !email || !cpf || !password) {
      return response
        .status(400)
        .json({ info: "all fields must be filled in!" });
    }

    try {
      const verify = await checkUserData(cpf, email);

      if (verify) {
        return response.status(409).json({
          info: "The data provided is already being used!",
        });
      }
    } catch (error) {
      console.log(error);
      return response.status(500).json({ info: "internal error server!" });
    }

    try {
      const createUserService = new CreateUserService();
      const data = await createUserService.createUser({
        name,
        email,
        cpf,
        password,
      });

      return response.json(data);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ info: "internal error server!" });
    }
  }
}
