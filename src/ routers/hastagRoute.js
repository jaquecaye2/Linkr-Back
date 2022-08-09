import { Router } from "express";
import { hastag } from "../controllers/hastagController.js";

const hastagRoute = Router();

hastagRoute.use("/hastag/:hastag", hastag)

export default hastagRoute