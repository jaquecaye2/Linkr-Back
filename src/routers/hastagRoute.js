import { Router } from "express";
import { hastag, updateHastagView, rankingHastags, allHashtags } from "../controllers/hastagController.js";

const hastagRoute = Router();

hastagRoute.get("/hastag/:hastag", hastag)
hastagRoute.put("/hastag/:hastag", updateHastagView)
hastagRoute.get("/hastags" , rankingHastags)

hastagRoute.get("/hastag2/:hastag", allHashtags)

export default hastagRoute