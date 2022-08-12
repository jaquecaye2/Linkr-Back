import { Router } from "express";
import { createPost,  showPosts, likePost, showMyLikes, howManyLikes } from "../controllers/postController.js";
import schemaValidator from "../middlewares/schemaValidator.js";
import {tokenValidator} from "../middlewares/tokenValidator.js";
import postSchema from "../schemas/postSchema.js";

const router = Router();

router.post("/post", tokenValidator, schemaValidator(postSchema), createPost);

router.get("/post", tokenValidator, showPosts)

router.post("/like", tokenValidator, likePost)

router.get("/like", tokenValidator, showMyLikes)

router.post("/likes", tokenValidator, howManyLikes)

export default router;
