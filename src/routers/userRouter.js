import { Router } from "express";

import userController from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/users", userController.getUsers);

export default userRouter;