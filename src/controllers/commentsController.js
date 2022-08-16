import httpStatus from "../utils/httpStatus.js";
import commentRepository from "../repositories/commentRepository.js";


export async function creatComment(req, res) {
    const { comment, postId } = req.body;
    const idUser = res.locals.idUser;//id do usuario que está comentando
    try {
    

        const isPostExistent = await commentRepository.isPostExistent(postId)
        const isUserExistent = await commentRepository.verifyUserId(idUser)
        if (isUserExistent.rowCount === 0 || !isPostExistent[0]) {
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
        console.log(e)
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}


export async function showAllCommentsNumber(req, res) {
    const { postId } = req.body;
    try {
        const { rows: comments } = await commentRepository.getAllPost_comments(postId)

        res.status(httpStatus.OK).send(comments[0])
    } catch (e) {
        console.log(e)
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}

export async function authorFollowers(req,res){
    const idUser = res.locals.idUser;
    console.log(idUser)
    try {
         const {rows: follows} = await commentRepository.userFollowers(idUser)

        res.status(httpStatus.OK).send(follows)
    } catch (e) {
        console.log(e)
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}