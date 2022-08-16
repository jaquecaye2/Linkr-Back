import Joi from "joi";

const commentsSchema = Joi.object({
    text: Joi.string().allow("").optional()
})

export default commentsSchema