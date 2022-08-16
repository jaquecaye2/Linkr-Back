import httpStatus from "../utils/httpStatus.js";
import commentRepository from "../repositories/commentRepository.js";

export async function creatComment(req, res) {
    const { comment } = req.body;
    const idUser = res.locals.idUser;//id do usuario que está comentando
    try {
        const isUserExistent = await commentRepository.verifyUserId(idUser)
        if (isUserExistent.rowCount === 0) {
            res.status(httpStatus.NOT_FOUND)
        }
        await commentRepository.insertComment(idUser, comment)

        res.sendStatus(httpStatus.OK)

    } catch (e) {
        console.log(e)
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}