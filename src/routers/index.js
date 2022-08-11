import { Router } from "express";
import hastagRoute from "./hastagRoute.js";
import postRouter from "./postRouter.js"

const router = Router();

router.use(hastagRoute)
router.use(postRouter)

export default router