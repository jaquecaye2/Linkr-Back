import httpStatus from "../utils/httpStatus.js";
import commentRepository from "../repositories/commentRepository.js";


export async function creatComment(req, res) {
    const { comment, postId } = req.body;
    const idUser = res.locals.idUser;//id do usuario que está comentando
    try {
        const isPostExistent = await commentRepository.isPostExistent(postId)
        const isUserExistent = await commentRepository.verifyUserId(idUser)
        if (isUserExistent.rowCount === 0 || isPostExistent.rowCount === 0) {
            return res.sendStatus(httpStatus.NOT_FOUND)
        }

        await commentRepository.insertComment(idUser, comment)

        const { rows: commentId } = await commentRepository.findCommentId(comment, idUser)
        await commentRepository.insertRelationPost(commentId[0].id, postId)

        const author = await commentRepository.postAuthor(postId)

        if (author.rows[0].user_id === idUser) {
            return res.status(httpStatus.OK).send({ author: "post's author" })
        } else {
            return res.sendStatus(httpStatus.OK)
        }
    } catch (e) {
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}


export async function getUsersComments(req, res) {
    const { postId } = req.params;
    try {
        const users = await commentRepository.getUsersCommentsInfo(postId)
    
        res.status(httpStatus.OK).send(users.rows)
    } catch (e) {
        console.log(e)
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}


export async function authorFollowers(req,res){
    const idUser = res.locals.idUser;
    try {
        const  { rows : userFollower } = await commentRepository.followUser(idUser)

        res.status(httpStatus.OK).send(userFollower)
    } catch (e) {
        console.log(e)
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}