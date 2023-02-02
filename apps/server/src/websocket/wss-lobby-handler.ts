import WebSocket from 'ws'

import {Request} from 'express'
import {players, rooms} from '../game/init'
import {ISession} from '../types'
import {broadcastAll, send} from '../utils/ws-helpers.util'
import {wssLobby} from './init'

let lastTimeBroadcastClientsCount = Date.now()

export const wssLobbyHandler = (socket: WebSocket.WebSocket, req: Request) => {
  if (Date.now() - lastTimeBroadcastClientsCount > 3000) {
    let clientsReadyCount = 0
    wssLobby.clients.forEach(client =>
      client.readyState === WebSocket.OPEN ? clientsReadyCount++ : null,
    )
    broadcastAll(wssLobby, {type: 'usersCount', content: clientsReadyCount})
    broadcastAll(wssLobby, {type: 'rooms', content: rooms.getRoomsMetadata()})
    lastTimeBroadcastClientsCount = Date.now()
  }

  const userId = (req.session as ISession).userId
  if (!userId) return
  players.findPlayer(userId).lobbySocket = socket

  socket.on('message', (data: string) => {
    const {type} = JSON.parse(data)
    switch (type) {
      case 'rooms':
        send(socket, {
          type: 'rooms',
          content: rooms.getRoomsMetadata(),
        })
        break
    }
  })
}
