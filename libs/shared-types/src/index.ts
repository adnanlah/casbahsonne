// export * from './lib/shared-types'
export type PlayerMetadataType = {id: string; name: string}

export type RoomStatusType = 'pending' | 'playing' | 'ended'

export type RoomMetadataType = {
  id: string
  name: string
  numOfPlayers: number
  players: PlayerMetadataType[]
  password: string
  watchable: boolean
  roomStatus: RoomStatusType
  gameProgress: number
}

export type WSPayloadType = {
  type: string
  content: unknown
}

export type LogType = {
  type: string
  content: string
}

export type PlayerStateType = {
  id: string
  name: string
  connected: boolean
  score: number
  meeplesLeft: number
}

export type GameStateType = {
  map: any
  players: PlayerStateType[]
  tileDrawn: string
  possiblePlays: []
  log: LogType[]
  timeleft: number
  whoseTurnId: string
}
