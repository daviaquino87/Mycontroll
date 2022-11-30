import { NextFunction, Request, Response } from "express";
import { EntityPropertyNotFoundError, QueryFailedError } from "typeorm";
import { ErrorPrivate } from "../utils/ExceptionError";

export function errorValidator(
  error: Error &
    Partial<ErrorPrivate> &
    Partial<QueryFailedError> &
    Partial<EntityPropertyNotFoundError>,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const statusCode = error.statusCode ?? 500;
  const messageError = error.message ?? "Internal error server!";

  if (error.privateError != true) {
    console.log(error.message);
    return response.status(500).json({ info: "Internal error server!" });
  }

  return response.status(statusCode).json({ info: messageError });
}
