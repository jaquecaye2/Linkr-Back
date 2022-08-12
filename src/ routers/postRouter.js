import { Router } from "express";
import {updatePost, deletePost} from "../controllers/postController.js";
import {validateSchema} from "../middlewares/schemaValidator.js"
import { updatePostSchema } from "../schemas/postSchema.js";

const postRouter = Router();

postRouter.put("/post/:id",validateSchema(updatePostSchema), updatePost);
postRouter.delete("/post/delete/:id", deletePost);

export default postRouter;