import { Router } from "express";
import hastagRoute from "./hastagRoute.js";

const router = Router();

router.use(hastagRoute)

export default router