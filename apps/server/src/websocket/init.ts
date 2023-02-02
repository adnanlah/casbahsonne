import {WebSocketServer} from 'ws'

export const wssLobby = new WebSocketServer({noServer: true})
export const wssGame = new WebSocketServer({noServer: true})
