export type TerrainType = 'grass' | 'city' | 'road' | 'monastery'
export type DegreeType = 0 | 1 | 2 | 3
export type CoordType = {x: number; y: number}
export type DirectionType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
export type PossiblePlay = {
  degrees: DegreeType[]
  coord: CoordType
}

export type FeatureId = number | null

export type FeatureType = {
  id: number | null
  terrain: TerrainType
  directions: DirectionType[]
  coordinatesInTile: CoordType
}

export type FeatureNodeType = FeatureType & {
  connections: number
  meeple: number | null
  coordinatesInMap: CoordType
}
