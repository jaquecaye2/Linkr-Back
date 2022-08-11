import { Router } from "express";
import { signIn } from "../controllers/auth/signIn.js";
import validateSchema  from "../middlewares/schemaValidator.js";
import signInSchema from "../schemas/signInSchema.js";
import { logIn } from "../controllers/auth/logIn.js";
import logInSchema from "../schemas/logInSchema.js";

import { tests } from "../controllers/auth/testsMeddlewares.js";
import { tokenValidator } from "../middlewares/tokenValidator.js";

const authRouter = Router()

authRouter.post('/singin',validateSchema(signInSchema), signIn)
authRouter.post('/login',validateSchema(logInSchema), logIn)

authRouter.post('/tests', tokenValidator, tests)

export default authRouter