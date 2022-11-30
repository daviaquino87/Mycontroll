import express from "express";
import { authMiddleware } from "../middleware/auth-user";
import { CreateTransactionController } from "../modules/Transactions/CreateTransaction/CreateTransactionController";
import { DeleteTransactionController } from "../modules/Transactions/DeleteTransaction/DeleteTransactionController";
import { ListMontantController } from "../modules/Transactions/ListMontantByTransaction/ListMontantController";
import { ListTransactionController } from "../modules/Transactions/ListTransaction/ListTransactionController";
import { UpdateTransactionController } from "../modules/Transactions/UpdateTransaction/UpdateTransactionController";
const createTransactionController = new CreateTransactionController();
const listTransactionController = new ListTransactionController();
const updateTransactionController = new UpdateTransactionController();
const deleteTransactionController = new DeleteTransactionController();
const listMontantController = new ListMontantController();

export const transactionRoutes = express();
transactionRoutes.use(authMiddleware);

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
transactionRoutes.get("/transaction/listMontant", listMontantController.list);
