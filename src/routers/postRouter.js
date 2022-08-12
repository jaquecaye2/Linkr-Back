import { Router } from "express";
import { createPost,  showPosts, deletePost, updatePost } from "../controllers/postController.js";
import schemaValidator from "../middlewares/schemaValidator.js";
import {tokenValidator} from "../middlewares/tokenValidator.js";
import postSchema from "../schemas/postSchema.js";

const router = Router();

router.post("/post", tokenValidator, schemaValidator(postSchema), createPost);

router.get("/post", tokenValidator, showPosts);

router.delete("/post/delete/:id/:hastagId",tokenValidator,deletePost);

router.put("/post/:id", updatePost);

export default router;
