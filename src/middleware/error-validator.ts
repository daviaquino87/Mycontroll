import { NextFunction, Request, Response } from "express";
import { ErrorPrivate } from "../utils/ExceptionError";

export function errorValidator(
  error: Error & Partial<ErrorPrivate>,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const statusCode = error.statusCode ?? 500;
  const messageError = error.message || "Internal error server!";

  return response.status(statusCode).json({ info: messageError });
}
