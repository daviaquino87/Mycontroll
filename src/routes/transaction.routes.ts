import express from "express";
import { CreateTransactionController } from "../modules/Transactions/CreateTransaction/CreateTransactionController";
import { DeleteTransactionController } from "../modules/Transactions/DeleteTransaction/DeleteTransactionController";
import { ListTransactionController } from "../modules/Transactions/ListTransaction/ListTransactionController";
import { UpdateTransactionController } from "../modules/Transactions/UpdateTransaction/UpdateTransactionController";
const createTransactionController = new CreateTransactionController();
const listTransactionController = new ListTransactionController();
const updateTransactionController = new UpdateTransactionController();
const deleteTransactionController = new DeleteTransactionController();

export const transactionRoutes = express();

transactionRoutes.post("/transaction", createTransactionController.create);
transactionRoutes.get("/transaction", listTransactionController.list);
transactionRoutes.post(
  "/transaction/:transacion_id/update",
  updateTransactionController.update
);
transactionRoutes.delete(
  "/transaction/:id/delete",
  deleteTransactionController.delete
);
