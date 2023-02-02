import {Request, Response} from 'express'
import {z} from 'zod'

import {wssLobby} from '../websocket/init'
import {players, rooms} from '../game/init'
import {ISession} from '../types'
import {broadcastAll} from '../utils/ws-helpers.util'
import {
  createRoomPayloadSchema,
  joinRoomPayloadSchema,
} from '../validations/room.validation'

const joinRoom = (playerId: string, roomId: string, password: string) => {
  const room = rooms.findRoom(roomId)
  if (!room) throw new Error('No room found!')
  const player = players.findPlayer(playerId)
  if (!player) throw new Error('No player found!')
  if (!room.isPlayerJoined(playerId)) {
    if (password === room.password) {
      room.joinRoom(player)
    } else {
      throw new Error('Password is incorrect!')
    }
  } else {
    throw new Error('Player already in the room!')
  }
}

const leaveRoom = (userId: string, roomId: string) => {
  const player = players.findPlayer(userId)
  if (!player) throw new Error('No player found!')
  if (player.gameSocket) player.gameSocket.close()

  const room = rooms.findRoom(roomId)
  if (!room) throw new Error('No room found!')
  room.kickPlayer(userId)
  if (room.players.length < 1) rooms.removeRoom(roomId)
}

const create = (req: Request, res: Response) => {
  const {
    body: {name, password, numOfPlayers, watchable},
  } = req as z.infer<typeof createRoomPayloadSchema>
  const {userId, roomId} = req.session as ISession

  if (!userId) throw new Error('User ID be invalid!')

  const newRoom = rooms.addRoom(name, userId, numOfPlayers, password, watchable)

  if (roomId) leaveRoom(userId, roomId)
  joinRoom(userId, newRoom.id, password)
  ;(req.session as ISession).roomId = newRoom.id

  broadcastAll(wssLobby, {type: 'rooms', content: rooms.getRoomsMetadata()})
  res.send({result: 'OK', userId})
}

const join = (req: Request, res: Response) => {
  const {
    body: {roomId, password},
  } = req as z.infer<typeof joinRoomPayloadSchema>

  const {userId, roomId: prevRoomId} = req.session as ISession

  if (prevRoomId) leaveRoom(userId, prevRoomId)

  joinRoom(userId, roomId, password)

  // set session to the new room id
  ;(req.session as ISession).roomId = roomId

  broadcastAll(wssLobby, {type: 'rooms', content: rooms.getRoomsMetadata()})

  rooms.findRoom(roomId).startGame()

  res.send({result: 'OK', message: 'Player joined.'})
}

const leave = (req: Request, res: Response) => {
  const {userId, roomId} = req.session as ISession

  leaveRoom(userId, roomId)
  ;(req.session as ISession).roomId = null

  broadcastAll(wssLobby, {type: 'rooms', content: rooms.getRoomsMetadata()})
  res.send({result: 'OK', message: 'Session destroyed!'})
}

export default {create, join, leave}
