import { NextFunction, Request, Response } from "express";
import { QueryFailedError } from "typeorm";
import { ErrorPrivate } from "../utils/ExceptionError";

export function errorValidator(
  error: Error & Partial<ErrorPrivate> & Partial<QueryFailedError>,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const statusCode = error.statusCode ?? 500;
  const messageError = error.message ?? "Internal error server!";

  if (error.query) {
    return response.status(statusCode).json({ info: "Internal error server!" });
  }

  return response.status(statusCode).json({ info: messageError });
}
