import {DisjointSet} from 'merge-find'
import {getOppositeSide, rotatePoint} from './helpers'
import {featuresData} from './data'
import {
  TerrainType,
  DegreeType,
  CoordType,
  DirectionType,
  PossiblePlay,
  FeatureType,
  FeatureId,
  FeatureNodeType,
} from './types'

export type MapType = Record<number, Record<number, Tile>>

export type MapPlaysType = Record<number, Record<number, boolean>>

export class Tile {
  id: string
  sides: TerrainType[]
  features: FeatureType[]
  isMonastery: boolean
  rotationTimes: number

  constructor(id: string) {
    this.id = id
    this.features = featuresData[id].map(f => ({...f, id: null}))
    this.isMonastery = !!featuresData[id].find(f => f.terrain === 'monastery')
    this.sides = []
    this.rotationTimes = 1
    this.setSides()
    this.setRotationTimes()
  }

  setSides() {
    const T = this.features.find(f => f.directions.includes(1))?.terrain
    const R = this.features.find(f => f.directions.includes(4))?.terrain
    const B = this.features.find(f => f.directions.includes(7))?.terrain
    const L = this.features.find(f => f.directions.includes(10))?.terrain

    if (!T || !R || !B || !L) throw new Error('Features are wrongly set!')

    this.sides = [T, R, B, L]
  }

  setRotationTimes() {
    if (this.isMonastery) {
      this.rotationTimes = 1
    } else if (
      this.sides[0] === this.sides[2] &&
      this.sides[1] === this.sides[3]
    ) {
      this.rotationTimes = 2
    } else {
      this.rotationTimes = 4
    }
  }

  rotate(times = 1) {
    const origins = [
      {x: 0, y: 0},
      {x: 1, y: 0},
      {x: 1, y: 1},
      {x: 0, y: 1},
    ]
    this.features = this.features.map(feature => ({
      ...feature,
      directions: feature.directions.map(
        direction => ((direction + 3 * times) % 12) as DirectionType,
      ),
      coordinatesInTile: rotatePoint(
        {x: feature.coordinatesInTile.x, y: feature.coordinatesInTile.y},
        times * -90,
      ),
    }))

    this.setSides()
  }

  getFeatureIdByDirection(direction: DirectionType): FeatureId | undefined {
    return this.features.find(feature => feature.directions.includes(direction))
      ?.id
  }

  getSidesAtDegree(times: number): TerrainType[] {
    const newArr: TerrainType[] = []
    for (let i = 0; i < this.sides.length; i++)
      newArr.push(this.sides[(i + times) % 4])
    return newArr
  }
}

const map: MapType = {}
const map2: MapPlaysType = {}

const disjointSets: Record<TerrainType, DisjointSet<FeatureNodeType>> = {
  grass: new DisjointSet<FeatureNodeType>(),
  road: new DisjointSet<FeatureNodeType>(),
  city: new DisjointSet<FeatureNodeType>(),
  monastery: new DisjointSet<FeatureNodeType>(),
}

function getTile(map: MapType, {x, y}: CoordType): Tile | undefined
function getTile(map: MapPlaysType, {x, y}: CoordType): boolean | undefined
function getTile(
  map: MapType | MapPlaysType,
  {x, y}: CoordType,
): Tile | boolean | undefined {
  if (map[y] === undefined) return undefined
  else return map[y][x]
}

function setTile(map: MapType, value: Tile, {x, y}: CoordType): void
function setTile(map: MapPlaysType, value: boolean, {x, y}: CoordType): void
function setTile(
  map: MapType | MapPlaysType,
  value: Tile | boolean,
  {x, y}: CoordType,
): void {
  // if (getTile(map as any, { x, y }))
  //   throw new Error(`There is already a value in ${x} ${y} in map: ${typeof map[x][y]}`)
  if (!map[y]) map[y] = {}
  if (!map[y - 1]) map[y - 1] = {}
  if (!map[y + 1]) map[y + 1] = {}

  map[y][x] = value
}

function placeTile(tile: Tile, {x, y}: CoordType) {
  setTile(map, tile, {x, y})
  setTile(map2, false, {x, y})

  const topAdjacentTile = getTile(map, {x, y: y - 1})
  const rightAdjacentTile = getTile(map, {x: x + 1, y})
  const bottomAdjacentTile = getTile(map, {x, y: y + 1})
  const leftAdjacentTile = getTile(map, {x: x - 1, y})

  setTile(map2, true, {x, y: y - 1})
  setTile(map2, true, {x: x + 1, y})
  setTile(map2, true, {x, y: y + 1})
  setTile(map2, true, {x: x - 1, y})

  // Connect features
  tile.features = tile.features.map(feature => {
    const specializedSet = disjointSets[feature.terrain]
    const id = specializedSet.add({
      ...feature,
      meeple: null,
      connections: 0,
      coordinatesInMap: {x, y},
    })
    feature.directions.map(direction => {
      const opposite = getOppositeSide(direction) as DirectionType
      if (
        direction >= 0 &&
        direction <= 2 &&
        typeof topAdjacentTile === 'object'
      ) {
        const adjId = topAdjacentTile.getFeatureIdByDirection(opposite)
        if (typeof adjId !== 'number') return
        const adjFeature = specializedSet.getList[adjId]
        if (adjFeature.terrain === feature.terrain) {
          specializedSet.union(id, adjId)
          specializedSet.getList[id].connections++
          adjFeature.connections++
        }
      }
      if (
        direction >= 3 &&
        direction <= 5 &&
        typeof rightAdjacentTile === 'object'
      ) {
        const adjId = rightAdjacentTile.getFeatureIdByDirection(opposite)
        if (typeof adjId !== 'number') return
        const adjFeature = specializedSet.getList[adjId]
        if (adjFeature.terrain === feature.terrain) {
          specializedSet.union(id, adjId)
          specializedSet.getList[id].connections++
          adjFeature.connections++
        }
      }
      if (
        direction >= 6 &&
        direction <= 8 &&
        typeof bottomAdjacentTile === 'object'
      ) {
        const adjId = bottomAdjacentTile.getFeatureIdByDirection(opposite)
        if (typeof adjId !== 'number') return
        const adjFeature = specializedSet.getList[adjId]
        if (adjFeature.terrain === feature.terrain) {
          specializedSet.union(id, adjId)
          specializedSet.getList[id].connections++
          adjFeature.connections++
        }
      }
      if (
        direction >= 9 &&
        direction <= 11 &&
        typeof leftAdjacentTile === 'object'
      ) {
        const adjId = leftAdjacentTile.getFeatureIdByDirection(opposite)
        if (typeof adjId !== 'number') return
        const adjFeature = specializedSet.getList[adjId]
        if (adjFeature.terrain === feature.terrain) {
          specializedSet.union(id, adjId)
          specializedSet.getList[id].connections++
          adjFeature.connections++
        }
      }
    })

    return {...feature, id}
  })

  const calcul = tile.features.map(calculatePoints)
}

function getPossiblePlays(id: string): PossiblePlay[] {
  const newTile = new Tile(id)
  const possiblePlays: PossiblePlay[] = []

  Object.keys(map2).forEach(yKey => {
    const y = parseInt(yKey)
    Object.keys(map2[y]).forEach(xKey => {
      const x = parseInt(xKey)

      if (!getTile(map2, {x, y})) return

      const topAdjacentTile = getTile(map, {x, y: y - 1})
      const rightAdjacentTile = getTile(map, {x: x + 1, y})
      const bottomAdjacentTile = getTile(map, {x, y: y + 1})
      const leftAdjacentTile = getTile(map, {x: x - 1, y})

      const degrees: DegreeType[] = []

      for (let i = 0; i < newTile.rotationTimes; i++) {
        const sidesAtDegree = newTile.getSidesAtDegree(i)
        let fit = true
        if (topAdjacentTile) {
          if (sidesAtDegree[0] !== topAdjacentTile.sides[2]) {
            fit = false
          }
        }
        if (rightAdjacentTile) {
          if (sidesAtDegree[1] !== rightAdjacentTile.sides[3]) {
            fit = false
          }
        }
        if (bottomAdjacentTile) {
          if (sidesAtDegree[2] !== bottomAdjacentTile.sides[0]) {
            fit = false
          }
        }
        if (leftAdjacentTile) {
          if (sidesAtDegree[3] !== leftAdjacentTile.sides[1]) {
            fit = false
          }
        }
        if (fit) degrees.push(i as DegreeType)
      }

      if (degrees.length) possiblePlays.push({coord: {x, y}, degrees})
    })
  })

  return possiblePlays
}

function calculatePoints(feature: FeatureType): {
  meeples: number[]
  points: number
} {
  if (feature.id === null) throw new Error('Feature is not added to any set')
  const specializedSet = disjointSets[feature.terrain]
  const featureNode = specializedSet.getList[feature.id]
  const subset = specializedSet.subset(feature.id)
  let isClosed = true
  const meeples: Record<string, number> = {}
  subset.forEach(feature => {
    if (feature.connections < feature.directions.length) isClosed = false
    if (featureNode.meeple)
      meeples[featureNode.meeple] = meeples[featureNode.meeple]
        ? meeples[featureNode.meeple] + 1
        : 0
  })
  const points = isClosed ? subset.length : 0
  const max = Object.entries(meeples)
    .sort((a, b) => {
      return b[1] - a[1]
    })
    .filter((e, i, a) => e[1] === a[0][1])
    .map(e => parseInt(e[0]))
  return {meeples: max, points}
}

// function placeMeeple(userId: number, feature: FeatureType) {
//   if (!feature.id) return
//   const featureNode = disjointSets[feature.terrain].getList[feature.id]
//   featureNode.meeple = userId
// }

// function placeMeeple(userId: number, {x, y}: CoordType, featureId: number) {

// }

const tyle1 = new Tile('GRGGRGCCCGGG')
// console.log(tyle1.features)
// const tyle2 = new Tile('GGGGRGGGGGRG')
// const tyle3 = new Tile('CCCGGGGGGGGG')
// const tyle4 = new Tile('CCCGGGGGGGGG')
// const tyle5 = new Tile('CCCGGGGGGGGG')

placeTile(tyle1, {x: 0, y: 0})

console.log(getPossiblePlays('GGGGRGGGGGRG'))

// console.log({ tyle4 })
// tyle1.rotate()
// console.log({ tyle1 })

// console.log('0, 0')
// console.log(getTile({ y: 0, x: 0 }))
// console.log('1, 0')
// console.log(getTile({ y: 1, x: 0 }))
// console.log('0, 1')
// console.log(getTile({ y: 0, x: 1 }))

// console.log(`disjointSets['city']`)
// disjointSets['city'].getList.map(e => console.log(e))
// console.log(`disjointSets['grass']`)
// disjointSets['grass'].getList.map(e => console.log(e))
// console.log(`disjointSets['road']`)
// disjointSets['road'].getList.map(e => console.log(e))

// console.log({ length: disjointSet.getList.length })
// console.log({ set: disjointSet.getList })
// console.log({ map })
// console.log(disjointSet.getList)
