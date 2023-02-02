import {Request, Response} from 'express'
import * as http from 'http'
import {parse} from 'url'

import {app, sessionParser} from './app'
import config from './config'
import {ISession} from './types'
import {wssGame, wssLobby} from './websocket/init'
import {wssGameHandler} from './websocket/wss-game-handler'
import {wssLobbyHandler} from './websocket/wss-lobby-handler'

const server = http.createServer(app)

server.on('upgrade', function (request: Request, socket, head) {
  const {pathname, query} = parse(request.url as string, true)

  if (pathname === '/lobby') {
    sessionParser(request, {} as Response, () => {
      if (!(request.session as ISession).userId) {
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n')
        socket.destroy()
        return
      }

      console.log('Session is parsed!')
      wssLobby.handleUpgrade(request, socket, head, function (ws) {
        wssLobby.emit('connection', ws, request)
      })
    })
  } else if (pathname === '/game') {
    sessionParser(request, {} as Response, () => {
      if ((request.session as ISession).roomId !== query.roomId) {
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n')
        socket.destroy()
        return
      }

      console.log('Session is parsed!')
      wssGame.handleUpgrade(request, socket, head, function (ws) {
        wssGame.emit('connection', ws, request)
      })
    })
  } else {
    socket.destroy()
  }
})

wssGame.on('connection', wssGameHandler)
wssLobby.on('connection', wssLobbyHandler)

server.listen(config.PORT, function () {
  console.log(`Listening on http://localhost:${config.PORT}`)
})
