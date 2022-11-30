import express from "express";
import { CreateUserController } from "../modules/User/CreateUser/CreateUserController";
import { AuthUserController } from "../modules/User/Auth/AuthUserController";
const userController = new CreateUserController();
const authUser = new AuthUserController();

export const userRoutes = express();

userRoutes.post("/user", userController.create);
userRoutes.post("/login", authUser.login);
