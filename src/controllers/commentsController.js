import httpStatus from "../utils/httpStatus.js";
import commentRepository from "../repositories/commentRepository.js";

export async function creatComment(req, res) {
    const { comment, postId } = req.body;
    const idUser = res.locals.idUser;//id do usuario que está comentando
    try {
        const isUserExistent = await commentRepository.verifyUserId(idUser)
        if (isUserExistent.rowCount === 0) {
            res.status(httpStatus.NOT_FOUND)
        }
        await commentRepository.insertComment(idUser, comment)

        const {rows: commentId} = await commentRepository.findCommentId(comment,idUser)
        
        await commentRepository.insertRelationPost(commentId[0].id,postId) 

        res.sendStatus(httpStatus.OK)

    } catch (e) {
        console.log(e)
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}


export async function showAllCommentsNumber(req,res){
    const { postId } = req.body;
try{
    const {rows: comments} = await commentRepository.getAllPost_comments(postId)
 
    res.status(httpStatus.OK).send(comments[0])
}catch(e){
    console.log(e)
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
}
}