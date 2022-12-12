import { AppdataSource } from "../../../database/data-source";
import { User } from "../../../database/entities/User";
import { ErrorPrivate } from "../../../utils/ExceptionError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { WhiteToken } from "../../../database/entities/WhiteTokens";

export class AuthUserService {
  async login(email: string, password: string) {
    const userService = AppdataSource.getRepository(User);
    const tokenService = AppdataSource.getRepository(WhiteToken);

    const user = await userService.findOneBy({ email });
    const hasLogged = await tokenService.findOneBy({ userId: user?.id });

    if (hasLogged) {
      throw new ErrorPrivate("User already logged in", 401);
    }

    if (!user) {
      throw new ErrorPrivate("Incorrect email or password", 400);
    }

    const verifyPass = await bcrypt.compare(password, user.password);

    if (!verifyPass) {
      throw new ErrorPrivate("Incorrect email or password", 400);
    }

    const token = jwt.sign({ id: user.id }, String(process.env.JWT_PASS), {
      expiresIn: 3600,
    });

    const { password: _, cpf: __, ...userlogin } = user;

    const data = {
      user: userlogin,
      token: token,
      authorized: true,
    };

    const newToken = tokenService.create({ token, userId: user.id });
    await tokenService.save(newToken);

    return data;
  }

  async logout(token: string) {
    const tokenService = AppdataSource.getRepository(WhiteToken);
    const mytoken = await tokenService.findOneBy({ token });
    if (!mytoken) {
      throw new ErrorPrivate("token not found", 401);
    }
    await tokenService.delete(mytoken);
    return true;
  }
}
