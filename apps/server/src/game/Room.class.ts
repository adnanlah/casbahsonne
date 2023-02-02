import {
  GameStateType,
  RoomMetadataType,
  RoomStatusType,
} from '@casbahsonne-monorepo/shared-types'
import {nanoid} from 'nanoid'
import {broadcastGroup} from '../utils/ws-helpers.util'

import {Game} from './Game.class'
import {randomInteger} from './helpers'
import {Player} from './Player.class'

export class Room extends Game {
  public readonly id: string
  public readonly creatorId: string
  public readonly name: string
  public readonly numOfPlayers: number
  public readonly password: string
  public readonly watchable: boolean
  public players: Player[]
  public roomStatus: RoomStatusType
  public turnIdx: number
  public turnStartedAt: number
  private tileDrawn: string
  // public playersIds: string[]
  public constructor(
    name: string,
    creatorId: string,
    numOfPlayers: number,
    password: string,
    watchable: boolean,
  ) {
    super()
    this.id = nanoid(7)
    this.creatorId = creatorId
    this.name = name
    this.numOfPlayers = numOfPlayers
    this.password = password
    this.watchable = watchable
    this.roomStatus = 'pending'
    this.players = []
    // this.playersIds = []
  }

  public joinRoom(player: Player) {
    if (this.players.length >= this.numOfPlayers)
      throw new Error('Room is full!')
    this.players.push(player)
  }

  public isPlayerJoined(playerId: string): boolean {
    return this.players.findIndex(p => p.id === playerId) >= 0
  }

  public kickPlayer(playerId: string) {
    this.players = this.players.filter(p => p.id !== playerId)
  }

  public hasPlayer(id: string) {
    return this.players.findIndex(p => p.id === id) >= 0
  }

  get playersLobbySockets() {
    return this.players.filter(p => !!p.lobbySocket).map(p => p.lobbySocket)
  }

  get playersGameSockets() {
    return this.players.filter(p => !!p.gameSocket).map(p => p.gameSocket)
  }

  get metadata(): RoomMetadataType {
    return {
      id: this.id,
      name: this.name,
      numOfPlayers: this.numOfPlayers,
      password: this.password,
      watchable: this.watchable,
      players: this.players.map(p => p.metadata),
      roomStatus: this.roomStatus,
      gameProgress: this.deck.progress,
    }
  }

  // ****************
  // *** Gameplay ***
  // ****************

  get gameState(): GameStateType {
    return {
      map: this.map,
      players: this.players.map(p => p.state),
      tileDrawn: this.tileDrawn,
      possiblePlays: [],
      log: [],
      timeleft: Date.now() - this.turnStartedAt,
      whoseTurnId: this.playerTurn.id,
    }
  }

  get playerTurn() {
    return this.players[this.turnIdx]
  }

  private moveTurn() {
    this.turnIdx = (this.turnIdx + 1) % this.numOfPlayers
  }

  public startGame() {
    this.turnIdx = randomInteger(0, this.numOfPlayers - 1)
    this.roomStatus = 'playing'
    broadcastGroup(this.playersLobbySockets, {
      type: 'game started',
      content: this.id,
    })
    this.nextTurn()
  }

  private nextTurn() {
    this.moveTurn()
    this.turnStartedAt = Date.now()
    this.tileDrawn = this.deck.drawATile()
    broadcastGroup(this.playersGameSockets, {
      type: 'game started',
      content: this.gameState,
    })
  }

  /*
  public play(
    userId: string,
    tileId: string,
    coord: CoordType,
    rotateDegree: number,
  ) {
    // place tile
    // validate
    // calculate points
    // send points to room
    // if remaintingtiles > 0
    // next turn
    // else
    // endgame
  }
  */

  public endGame() {
    this.roomStatus = 'ended'
  }
}
