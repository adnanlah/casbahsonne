import {Router} from 'express'

import roomController from '../controllers/room.controller'
import isAuthenticated from '../middlewares/auth.middleware'
import validate from '../middlewares/validate.middleware'
import {
  createRoomPayloadSchema,
  joinRoomPayloadSchema,
} from '../validations/room.validation'

const roomRouter = Router()

roomRouter.post(
  '/create-room',
  [isAuthenticated, validate(createRoomPayloadSchema)],
  roomController.create,
)

roomRouter.post(
  '/join-room',
  [isAuthenticated, validate(joinRoomPayloadSchema)],
  roomController.join,
)

roomRouter.post('/leave-room', isAuthenticated, roomController.leave)

export default roomRouter
