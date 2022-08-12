import { Router } from "express";
import { hastag, updateHastagView, rankingHastags } from "../controllers/hastagController.js";

const hastagRoute = Router();

hastagRoute.get("/hastag/:hastag", hastag)
hastagRoute.put("/hastag/:hastag", updateHastagView)
hastagRoute.get("/hastags" , rankingHastags)

export default hastagRoute