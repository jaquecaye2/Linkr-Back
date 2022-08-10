import { Router } from "express";
import { hastag, rankingHastag } from "../controllers/hastagController.js";

const hastagRoute = Router();

hastagRoute.get("/hastag/:hastag", hastag)
hastagRoute.put("/hastag/:hastag", rankingHastag)

export default hastagRoute