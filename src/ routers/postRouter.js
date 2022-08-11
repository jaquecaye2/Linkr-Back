import { Router } from "express";
import {updatePost} from "../controllers/postController.js";
import {validateSchema} from "../middlewares/schemaValidator.js"
import { updatePostSchema } from "../schemas/postSchema.js";

const postRouter = Router();

postRouter.put("/post/:id",validateSchema(updatePostSchema), updatePost);

export default postRouter;