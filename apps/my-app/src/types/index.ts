export type TileDataType = {
  id: string
  rotationTimes: number
  meeple: {id: number; coords: {x: number; y: number}} | null
}

export type MapType = Record<number, Record<number, TileDataType>>

export type PlacementsMapType = Record<
  number,
  Record<
    number,
    {
      id: string
      possibleRotations: number[]
    }
  >
>

export type UserProfileType = {
  username: string | null
  userId: string | null
  gamesPlayed?: number
  gamesWon?: number
}

export type RoomDataType = {
  id: string
  name: string
  numOfPlayers: number
  players: string[]
  password: string
  watchable: boolean
}
