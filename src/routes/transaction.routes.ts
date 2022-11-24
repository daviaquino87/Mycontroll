import express from "express";
import { CreateTransactionController } from "../modules/Transactions/CreateTransaction/CreateTransactionController";
import { ListTransactionController } from "../modules/Transactions/ListTransaction/ListTransactionController";
const createTransactionController = new CreateTransactionController();
const listTransactionController = new ListTransactionController();

export const transactionRoutes = express();

transactionRoutes.post("/transaction", createTransactionController.create);
transactionRoutes.get("/transaction", listTransactionController.list);
