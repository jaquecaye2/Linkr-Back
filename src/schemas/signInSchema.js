import Joi from "joi";

const signInSchema = Joi.object({

    name: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    pictureUrl: Joi.string().required()
})

export default(signInSchema)