import { AppdataSource } from "../../../database/data-source";
import { User } from "../../../database/entities/User";
import { ErrorPrivate } from "../../../utils/ExceptionError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthUserService {
  async login(email: string, password: string) {
    const userService = AppdataSource.getRepository(User);

    const user = await userService.findOneBy({ email });

    if (!user) {
      throw new ErrorPrivate("Incorrect email or password", 400, true);
    }

    const verifyPass = await bcrypt.compare(password, user.password);

    if (!verifyPass) {
      throw new ErrorPrivate("Incorrect email or password", 400, true);
    }

    const token = jwt.sign({ id: user.id }, String(process.env.JWT_PASS), {
      expiresIn: 3600,
    });

    const { password: _, ...userlogin } = user;

    const data = {
      user: userlogin,
      token: token,
      authorized: true,
    };

    return data;
  }
}
