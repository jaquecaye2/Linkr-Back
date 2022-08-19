import { Router } from "express";

import userController from "../controllers/userController.js";

import { tokenValidator } from "../middlewares/tokenValidator.js";

const userRouter = Router();

userRouter.get("/users", tokenValidator, userController.getUsers);

userRouter.get("/users/:id", tokenValidator, userController.redirectToUser);
userRouter.post("/users/:id/follow", tokenValidator, userController.follow);
userRouter.post("/users/:id/unfollow", tokenValidator, userController.unfollow);

userRouter.get("/users2/:id", tokenValidator, userController.allPosts);

export default userRouter;
