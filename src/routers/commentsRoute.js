import { Router } from "express";
import { creatComment, authorFollowers, getUsersComments } from "../controllers/commentsController.js";
import { tokenValidator } from "../middlewares/tokenValidator.js";
import commentsSchema from "../schemas/commentsSchema.js";
import schemaValidator from "../middlewares/schemaValidator.js"

const commentsRoute = Router()

commentsRoute.post("/comment", tokenValidator, schemaValidator(commentsSchema), creatComment);
commentsRoute.get("/comments",tokenValidator, authorFollowers);
commentsRoute.get("/comments/users/:postId",tokenValidator, getUsersComments);

export default commentsRoute;