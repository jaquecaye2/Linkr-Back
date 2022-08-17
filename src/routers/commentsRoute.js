import { Router } from "express";
import { creatComment, showAllCommentsNumber, authorFollowers } from "../controllers/commentsController.js";
import { tokenValidator } from "../middlewares/tokenValidator.js";
import commentsSchema from "../schemas/commentsSchema.js";
import schemaValidator from "../middlewares/schemaValidator.js"

const commentsRoute = Router()

commentsRoute.post("/comment", tokenValidator, schemaValidator(commentsSchema), creatComment);
commentsRoute.post("/comments",tokenValidator, showAllCommentsNumber);
commentsRoute.get("/comments",tokenValidator, authorFollowers);

export default commentsRoute;