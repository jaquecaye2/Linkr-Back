import { Router } from "express";
import hastagRoute from "./hastagRoute.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use(hastagRoute)
router.use(userRouter)

export default router