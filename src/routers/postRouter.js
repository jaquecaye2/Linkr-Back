import { Router } from "express";
import { createPost,  showPosts, deletePost, updatePost, likePost, showMyLikes, howManyLikes, allPosts } from "../controllers/postController.js";
import schemaValidator from "../middlewares/schemaValidator.js";
import { tokenValidator } from "../middlewares/tokenValidator.js";
import postSchema from "../schemas/postSchema.js";

const router = Router();

router.post("/post", tokenValidator, schemaValidator(postSchema), createPost);

router.get("/post", tokenValidator, showPosts);

router.get("/posts", tokenValidator, allPosts);

router.post("/like", tokenValidator, likePost)

router.get("/like", tokenValidator, showMyLikes)

router.post("/likes", tokenValidator, howManyLikes)

router.delete("/post/:id",tokenValidator,deletePost);

router.put("/post/:id",tokenValidator, updatePost);

export default router;
