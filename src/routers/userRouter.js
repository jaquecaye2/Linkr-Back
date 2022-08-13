import { Router } from "express";

import userController from "../controllers/userController.js";

import { tokenValidator } from "../middlewares/tokenValidator.js";


const userRouter = Router();

userRouter.get("/users", userController.getUsers);

userRouter.get("/users/:id", userController.redirectToUser );

export default userRouter;