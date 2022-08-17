import { Router } from "express";
import hastagRoute from "./hastagRoute.js";
import postRouter from "./postRouter.js"
import userRouter from "./userRouter.js";
import authRouter from "./authRoutes.js";
import commentsRoute from "./commentsRoute.js";
import sharedRouter from "./sharedRoutes.js";

const router = Router();

router.use(authRouter)
router.use(userRouter);
router.use(hastagRoute)
router.use(postRouter)
router.use(commentsRoute)
router.use(sharedRouter)

export default router