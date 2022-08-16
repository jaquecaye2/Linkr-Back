import Joi from "joi";

const commentsSchema = Joi.object({
    comment: Joi.string().required(),
    postId: Joi.number().required()
})

export default commentsSchema