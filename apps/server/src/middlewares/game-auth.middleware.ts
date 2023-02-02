import {NextFunction, Request, Response} from 'express'
import z from 'zod'

import {rooms} from '../game/init'
import {ISession} from '../types'
import {checkIngamePayloadSchema} from '../validations/auth.validation'

export default function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!(req.session as ISession).userId) res.status(401).send('Unauthorized!')
  const {
    body: {roomId},
  } = req as z.infer<typeof checkIngamePayloadSchema>

  const isIngame = rooms
    .findRoom(roomId)
    .hasPlayer((req.session as ISession).userId)
  if (!isIngame) res.status(401).send('Unauthorized!')
  else next()
}
