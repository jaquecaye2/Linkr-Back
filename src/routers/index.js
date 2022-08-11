import { Router } from "express";
import hastagRoute from "./hastagRoute.js";
import postRouter from "./postRouter.js"
import userRouter from "./userRouter.js";

const router = Router();

router.use(userRouter);
router.use(hastagRoute)
router.use(postRouter)

export default router