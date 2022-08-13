import { Router } from "express";
import { createPost, showPosts } from "../controllers/postController.js";
import schemaValidator from "../middlewares/schemaValidator.js";
import { tokenValidator } from "../middlewares/tokenValidator.js";
import postSchema from "../schemas/postSchema.js";

const router = Router();

// router.post("/post", tokenValidator, schemaValidator(postSchema), createPost);
router.post("/post", createPost);

router.get("/post", tokenValidator, showPosts);

export default router;
