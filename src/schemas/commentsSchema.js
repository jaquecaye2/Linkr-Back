import Joi from "joi";

const commentsSchema = Joi.object({
    comment: Joi.string().optional()
})

export default commentsSchema