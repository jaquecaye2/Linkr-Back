import { Router } from "express";
import { creatComment } from "../controllers/commentsController.js";
import { tokenValidator } from "../middlewares/tokenValidator.js";

const commentsRoute = Router()

commentsRoute.post("/comment",tokenValidator, creatComment);

export default commentsRoute;