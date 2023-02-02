/* eslint-disable @typescript-eslint/no-empty-function */
import {DisjointSet} from 'merge-find'

import {Tile} from './core'
import {basicDeck} from './data'
import {Deck} from './Deck.class'
import {FeatureNodeType, TerrainType} from './types'

export class Game {
  public map: Record<number, Record<number, Tile>>
  public map2: Record<number, Record<number, boolean>>
  public timeout: number
  public deck: Deck
  private disjointSets: Record<TerrainType, DisjointSet<FeatureNodeType>>

  constructor() {
    this.map = {}
    this.map2 = {}
    this.disjointSets = {
      grass: new DisjointSet<FeatureNodeType>(),
      road: new DisjointSet<FeatureNodeType>(),
      city: new DisjointSet<FeatureNodeType>(),
      monastery: new DisjointSet<FeatureNodeType>(),
    }
    this.timeout = 4000
    this.deck = new Deck(basicDeck)
  }

  public getTile() {}

  public setTile() {}

  public getPossiblePlays() {}

  public calculateLastPlay() {}
}
