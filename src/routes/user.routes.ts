import express from "express";
import { CreateUserController } from "../modules/User/CreateUser/CreateUserController";
import { AuthUserController } from "../modules/User/Auth/AuthUserController";
import { authMiddleware } from "../middleware/auth-user";
import { UpdateUserController } from "../modules/User/UpdateUser/UpdateUserController";
import { DeleteUserController } from "../modules/User/DeleteUser/DeleteUserController";
const userController = new CreateUserController();
const authUser = new AuthUserController();
const updateUser = new UpdateUserController();
const deleteUser = new DeleteUserController();

export const userRoutes = express();

userRoutes.post("/user", userController.create);
userRoutes.post("/login", authUser.login);

userRoutes.use(authMiddleware);
userRoutes.post("/logout", authUser.logout);
userRoutes.post("/user/update", updateUser.update);
userRoutes.delete("/user/delete", deleteUser.delete);
