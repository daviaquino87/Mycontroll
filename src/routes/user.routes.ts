import express from "express";
import { CreateUserController } from "../modules/User/CreateUser/CreateUserController";
const userController = new CreateUserController();

export const userRoutes = express();

userRoutes.post("/user", userController.create);
