import {randomInteger} from './helpers'

export class Deck {
  public deckData: Record<string, number>
  public readonly deckSize: number

  constructor(data: Record<string, number>) {
    this.deckData = data
    this.deckSize = this.numOfRemainingTiles
  }

  get numOfRemainingTiles() {
    return Object.values(this.deckData).reduce((prev, curr) => prev + curr, 0)
  }

  get progress() {
    return (this.deckSize - this.numOfRemainingTiles) / this.deckSize
  }

  public drawATile() {
    const remainingTilesIds: string[] = Object.keys(this.deckData)
      .map(key => new Array(this.deckData[key]).fill(key))
      .flat()

    const ran = randomInteger(0, remainingTilesIds.length - 1)
    const nextTileId = remainingTilesIds[ran]
    this.deckData[nextTileId]--
    return nextTileId
  }
}
