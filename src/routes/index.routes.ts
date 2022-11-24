import express from "express";
import { userRoutes } from "./user.routes";
import { transactionRoutes } from "./transaction.routes";

export const routes = express();
routes.use(userRoutes);
routes.use(transactionRoutes);

routes.get("/", (request, response) => {
  return response.status(200).json({ info: "Route test!" });
});
