import { NextFunction, Request, Response } from "express";

export function errorValidator(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.log(error.message);
  return response.status(500).json({ info: "Internal error server!" });
}
