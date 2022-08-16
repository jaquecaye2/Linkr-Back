import { Router } from "express";
import { creatComment, showAllCommentsNumber } from "../controllers/commentsController.js";
import { tokenValidator } from "../middlewares/tokenValidator.js";
import commentsSchema from "../schemas/commentsSchema.js";
import schemaValidator from "../middlewares/schemaValidator.js"

const commentsRoute = Router()

commentsRoute.post("/comment",tokenValidator,schemaValidator(commentsSchema), creatComment);
commentsRoute.get("/comments",showAllCommentsNumber);

export default commentsRoute;