import express, {json} from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routers/index.js";

dotenv.config();

const server = express();

server.use(json());
server.use(cors());

server.use(router)

const port = process.env.PORT || 5007
server.listen(port ,()=>{
    console.log(`Servidor rodando na porta ${port}`)
})  