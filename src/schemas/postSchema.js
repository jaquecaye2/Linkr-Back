import joi from "joi";

const postSchema = joi.object({
    link: joi.string().uri().required(),
    description: joi.string().allow("").optional()
  });

const updatePostSchema = joi.object({
  description: joi.string().required()
});

export { 
    postSchema,
    updatePostSchema
};