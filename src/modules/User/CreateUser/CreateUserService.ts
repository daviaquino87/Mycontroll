import { AppdataSource } from "../../../database/data-source";
import { User } from "../../../database/entities/User";
import { CreateUser } from "./interface/CreateUserInterface";

export class CreateUserService {
  async createUser({ name, email, password, cpf }: CreateUser) {
    const userService = AppdataSource.getRepository(User);

    const newUser = userService.create({
      name,
      email,
      password,
      cpf,
    });

    if (!newUser) {
      throw new Error();
    }

    const user = await userService.save(newUser);

    const { password: _, ...rest } = newUser;

    return rest;
  }
}
