import {WSPayloadType} from '@casbahsonne-monorepo/shared-types'
import WebSocket from 'ws'

export const send = (socket: WebSocket.WebSocket, obj: WSPayloadType) => {
  socket.send(JSON.stringify(obj))
}

export const broadcastAll = (
  wss: WebSocket.Server<WebSocket.WebSocket>,
  obj: WSPayloadType,
) => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(obj))
    }
  })
}

export const broadcastGroup = (
  sockets: WebSocket.WebSocket[],
  obj: WSPayloadType,
) => {
  sockets.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(obj))
    }
  })
}

export const broadcastExclude = (
  wss: WebSocket.Server<WebSocket.WebSocket>,
  socket: WebSocket.WebSocket,
  obj: WSPayloadType,
) => {
  wss.clients.forEach(client => {
    if (client !== socket && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(obj))
    }
  })
}

// {
//     type: "room",
//     content: rooms.rooms.map(r => r.roomInfo())
// }
