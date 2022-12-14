import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppdataSource } from "../database/data-source";
import { User } from "../database/entities/User";
import { WhiteToken } from "../database/entities/WhiteTokens";
import { ErrorPrivate } from "../utils/ExceptionError";

type JWTPlayload = {
  id: number;
  exp: number;
};

export const authMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { authorization } = request.headers;

  if (!authorization || authorization.length < 10) {
    throw new ErrorPrivate("Unauthorized!", 401, true);
  }

  const userService = AppdataSource.getRepository(User);
  const tokenService = AppdataSource.getRepository(WhiteToken);

  const token = String(authorization).split(" ");

  const tokenIsValid = await tokenService.findOneBy({ token: token[1] });

  if (token[0] != "Bearer" || !tokenIsValid) {
    throw new ErrorPrivate("Unauthorized!", 401, true);
  }

  const verify = jwt.decode(token[1]) as JWTPlayload;

  if (new Date(verify.exp * 1000).getTime() < new Date().getTime()) {
    await tokenService.delete(token[1]);
    throw new ErrorPrivate("Unauthorized!", 401, true);
  }

  const { id } = jwt.verify(
    token[1],
    String(process.env.JWT_PASS)
  ) as JWTPlayload;

  const user = await userService.findOneBy({ id });

  if (!user) {
    throw new ErrorPrivate("Unauthorized!", 401, true);
  }

  const { password: _, ...userloggad } = user;

  request.user = userloggad;

  next();
};
