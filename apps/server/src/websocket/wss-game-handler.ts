import {Request} from 'express'
import WebSocket from 'ws'
import {players} from '../game/init'
import {ISession} from '../types'

export const wssGameHandler = (socket: WebSocket.WebSocket, req: Request) => {
  // only if the user has logged in to a room
  console.log('connected to wssGame')
  const userId = (req.session as ISession).userId
  if (!userId) return
  players.findPlayer(userId).gameSocket = socket
}
