import Jwt  from "jsonwebtoken";

export function tokenValidator(req, res, next){

    try{
        const headers = req.headers
        
        const secretKey = process.env.JWT_SECRET
        const token = headers.authorization?.split(" ")[1]
        
        const {iduser} =  Jwt.verify(token, secretKey);
        
        res.locals.idUser = iduser
        
        next()
    }catch{
        return res.sendStatus(401)
    }
}