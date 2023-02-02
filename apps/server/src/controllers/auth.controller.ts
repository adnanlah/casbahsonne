import {Request, Response} from 'express'
import z from 'zod'

import {players, rooms} from '../game/init'
import {ISession} from '../types'
import {
  loginPayloadSchema,
  checkIngamePayloadSchema,
} from '../validations/auth.validation'

const login = (req: Request, res: Response) => {
  const {
    body: {username},
  } = req as z.infer<typeof loginPayloadSchema>

  const newPlayer = players.addPlayer(String(username))
  ;(req.session as ISession).userId = newPlayer.id
  res.send({
    message: 'Logged in to the lobby!',
    userId: newPlayer.id,
    username: newPlayer.name,
  })
}

const checkAuth = (req: Request, res: Response) => {
  // if (!(req.session as ISession).userId) res.status(401).send('Unauthorized!')
  res.status(200).send('Authorized!')
}

const checkIngame = (req: Request, res: Response) => {
  const {
    body: {roomId},
  } = req as z.infer<typeof checkIngamePayloadSchema>
  const isIngame = rooms
    .findRoom(roomId)
    .hasPlayer((req.session as ISession).userId)
  if (isIngame) res.status(200).send('Authorized!')
  else res.status(401).send('Unauthorized!')
}

const logout = (req: Request, res: Response) => {
  ;(req.session as ISession).userId = null
  res.send({
    result: 'OK',
    message: 'Logged out successfully!',
  })
}

export default {login, checkAuth, checkIngame, logout}
