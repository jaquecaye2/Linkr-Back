import Joi from "joi";

const logInSchema = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().required(),
});

export default logInSchema;
