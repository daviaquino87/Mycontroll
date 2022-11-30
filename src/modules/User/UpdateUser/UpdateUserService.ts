import { AppdataSource } from "../../../database/data-source";
import { User } from "../../../database/entities/User";
import { ErrorPrivate } from "../../../utils/ExceptionError";
import { UpdateUsuario } from "./Interface/UpdateUsuarioInterface";

export class UpdateUserService {
  async update(user_id: number, data: UpdateUsuario) {
    const userService = AppdataSource.getRepository(User);

    const user = await userService.findOneBy({ id: user_id });

    if (!user) {
      throw new ErrorPrivate("Not found!", 404, true);
    }

    await userService.update(user_id, { ...data });

    const { password: _, cpf: __, ...userUpdate } = user;

    return userUpdate;
  }
}
