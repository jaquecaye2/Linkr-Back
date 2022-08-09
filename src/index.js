import express, {json} from "express";
import cors from "cors";
import dotenv from "dotenv";

import postRouter from "./routers/postRouter.js";

dotenv.config();

const server = express();

server.use(express.json());
server.use(cors());

server.use(postRouter)

const port = process.env.PORT || 5007
server.listen(port ,()=>{
    console.log(`Servidor rodando na porta ${port}`)
})