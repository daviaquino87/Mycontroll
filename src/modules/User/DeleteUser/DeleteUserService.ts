import { AppdataSource } from "../../../database/data-source";
import { Transaction } from "../../../database/entities/Transaction";
import { User } from "../../../database/entities/User";
import { ErrorPrivate } from "../../../utils/ExceptionError";
import { AuthUserService } from "../Auth/AuthUserService";

export class DeleteUserService {
  async delete(id: number, token: string) {
    const userService = AppdataSource.getRepository(User);
    const authService = new AuthUserService();

    const user = await userService.find({
      where: {
        id,
      },
      relations: {
        transactions: true,
      },
    });

    if (!user) {
      throw new ErrorPrivate("Not found!", 404, true);
    }

    await userService.delete(id);

    await authService.logout(token);

    return user;
  }
}
