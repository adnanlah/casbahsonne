import {nanoid} from 'nanoid'
import {Player} from './Player.class'

export class Players {
  public players: Map<string, Player>

  public constructor() {
    this.players = new Map()
  }

  public addPlayer(name: string) {
    const id = nanoid()
    const p = new Player(id, name)

    this.players.set(id, p)
    return p
  }

  public removePlayer(id: string) {
    this.players.delete(id)
  }

  public findPlayer(id: string) {
    return this.players.get(id)
  }

  public getAllPlayers() {
    const a: Player[] = []
    this.players.forEach(player => a.push(player))
    return a
  }
}
