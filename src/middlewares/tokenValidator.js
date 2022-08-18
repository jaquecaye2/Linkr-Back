import Jwt  from "jsonwebtoken";
import dotenv from 'dotenv';

export function tokenValidator(req, res, next){
    dotenv.config();

    try{
        const headers = req.headers
        const secretKey = process.env.JWT_SECRET
        const token = headers.authorization?.split(" ")[1]

        console.log(token)
        
        const {iduser} =  Jwt.verify(token, secretKey);
        
        res.locals.idUser = iduser

        next()
    }catch{
        return res.sendStatus(401)
    }
}