import { Router } from "express";
import hastagRoute from "./hastagRoute.js";
import userRouter from "./userRouter.js";
import postRouter from "./postRouter.js";

const router = Router();

router.use(hastagRoute)
router.use(userRouter)
router.use(postRouter)


export default router