import {Session} from 'express-session'

export type RoomType = {
  id: string
  name: string
  playersIds: string[]
  password: string
  watchable: boolean
}

export type PlayerType = {
  id: string
  name: string
}

export interface ISession extends Session {
  userId?: string | null
  roomId?: string | null
}
