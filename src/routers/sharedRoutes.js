
import {shared, countShared} from '../controllers/shared.js'
import { tokenValidator } from '../middlewares/tokenValidator.js'
import { Router } from 'express'

const sharedRouter = Router()

sharedRouter.post('/shared', tokenValidator, shared)

sharedRouter.get('/countShared', tokenValidator, countShared)

export default sharedRouter

