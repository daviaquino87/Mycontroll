import { AppdataSource } from "../../../database/data-source";
import { Transaction } from "../../../database/entities/Transaction";
import { User } from "../../../database/entities/User";
import { ErrorPrivate } from "../../../utils/ExceptionError";

export class DeleteUserService {
  async delete(id: number) {
    const userService = AppdataSource.getRepository(User);

    const user = await userService.findOneBy({ id });

    if (!user) {
      throw new ErrorPrivate("Not found!", 404, true);
    }

    await userService.delete(user);

    return user;
  }
}
