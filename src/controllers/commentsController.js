import httpStatus from "../utils/httpStatus.js";

export function creatComment(req,res){
    try{
        res.sendStatus(httpStatus.OK)

    }catch(e){
        console.log(e)
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}