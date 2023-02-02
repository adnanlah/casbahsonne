import {
  PlayerMetadataType,
  PlayerStateType,
} from '@casbahsonne-monorepo/shared-types'
import WebSocket from 'ws'

export class Player {
  public readonly id: string
  public readonly name: string
  public lobbySocket: WebSocket.WebSocket
  public gameSocket: WebSocket.WebSocket
  public connected: boolean
  public score: number
  public meeplesLeft: number

  public constructor(id: string, name: string) {
    this.id = id
    this.name = name
    this.gameSocket = undefined
    this.lobbySocket = undefined
    this.connected = false
    this.score = 0
  }

  public incrementScoreBy(val: number) {
    this.score = this.score = val
  }

  get metadata(): PlayerMetadataType {
    return {
      id: this.id,
      name: this.name,
    }
  }

  get state(): PlayerStateType {
    return {
      id: this.id,
      name: this.name,
      connected: this.connected,
      score: this.score,
      meeplesLeft: this.meeplesLeft,
    }
  }
}
