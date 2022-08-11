import { Router } from "express";
import { createPost,  showPosts } from "../controllers/postController.js";
import schemaValidator from "../middlewares/schemaValidator.js";
//import validateUser from "../middlewares/validateUser.js";
import postSchema from "../schemas/postSchema.js";

const router = Router();

// adicionar a validação do usuário em todas as rotas

router.post("/post", schemaValidator(postSchema), createPost);

router.get("/post", showPosts)

export default router;
