import { Router } from "express";
import { cratePost,  showPosts } from "../controllers/postController.js";
import schemaValidator from "../middlewares/schemaValidator.js";
//import validateUser from "../middlewares/validateUser.js";
import postSchema from "../schemas/postSchema.js";

const router = Router();

router.post("/post", schemaValidator(postSchema), cratePost);

router.get("/post", showPosts)

export default router;
