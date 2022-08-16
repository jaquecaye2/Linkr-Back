import { Router } from "express";
import { creatComment } from "../controllers/commentsController.js";

const commentsRoute = Router()

commentsRoute.post("/comment", creatComment);

export default commentsRoute;