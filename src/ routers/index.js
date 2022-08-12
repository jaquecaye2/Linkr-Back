import { Router } from "express";

import hastagRoute from "./hastagRoute.js";
import userRouter from "./userRouter.js";
import postRouter from "./postRouter.js";
import authRouter from "./authRoutes.js";

const router = Router(); 

router.use(hastagRoute)
router.use(userRouter)
router.use(postRouter)
router.use(authRouter)


export default router