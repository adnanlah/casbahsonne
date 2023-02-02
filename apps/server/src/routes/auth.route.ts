import {Router} from 'express'

import authController from '../controllers/auth.controller'
import isAuthenticated from '../middlewares/auth.middleware'
import validate from '../middlewares/validate.middleware'
import {
  loginPayloadSchema,
  checkIngamePayloadSchema,
} from '../validations/auth.validation'

const sessionRouter = Router()

sessionRouter.post('/login', validate(loginPayloadSchema), authController.login)

sessionRouter.post('/check-auth', isAuthenticated, authController.checkAuth)

sessionRouter.post(
  '/check-ingame',
  [isAuthenticated, validate(checkIngamePayloadSchema)],
  authController.checkIngame,
)

sessionRouter.post('/logout', isAuthenticated, authController.logout)

export default sessionRouter
