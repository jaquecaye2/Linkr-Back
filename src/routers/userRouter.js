import { Router } from "express";

import userController from "../controllers/userController.js";

import { tokenValidator } from "../middlewares/tokenValidator.js";

const userRouter = Router();

userRouter.get("/users", userController.getUsers);

userRouter.get("/users/:id", tokenValidator, userController.redirectToUser);
userRouter.post("/users/:id/follow", tokenValidator, userController.follow);
userRouter.post("/users/:id/unfollow", tokenValidator, userController.unfollow);

export default userRouter;
