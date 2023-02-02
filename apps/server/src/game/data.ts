import {FeatureType} from './types'

export const featuresData: Record<string, FeatureType[]> = {
  GRGGRGCCCGGG: [
    {
      id: null,
      coordinatesInTile: {y: -0.1, x: -0.1},
      terrain: 'road',
      directions: [1, 4],
    },
    {
      id: null,
      coordinatesInTile: {y: 0.25, x: 0.25},
      terrain: 'grass',
      directions: [2, 3],
    },
    {
      id: null,
      coordinatesInTile: {y: -0.25, x: -0.25},
      terrain: 'grass',
      directions: [0, 5, 9, 10, 11],
    },
    {
      id: null,
      coordinatesInTile: {y: 0.4, x: -0.1},
      terrain: 'city',
      directions: [6, 7, 8],
    },
  ],
  GGGGRGGGGGRG: [
    {
      id: null,
      coordinatesInTile: {y: -0.25, x: -0.1},
      terrain: 'grass',
      directions: [0, 1, 2, 3, 11],
    },
    {
      id: null,
      coordinatesInTile: {y: 0, x: 0},
      terrain: 'road',
      directions: [10, 4],
    },
    {
      id: null,
      coordinatesInTile: {y: 0.25, x: 0.1},
      terrain: 'grass',
      directions: [5, 6, 7, 8, 9],
    },
  ],
  CCCGGGGGGGGG: [
    {
      id: null,
      coordinatesInTile: {y: 0.1, x: -0.4},
      terrain: 'city',
      directions: [0, 1, 2],
    },
    {
      id: null,
      coordinatesInTile: {y: 0.2, x: 0},
      terrain: 'grass',
      directions: [3, 4, 5, 6, 7, 8, 9, 10, 11],
    },
  ],
}

export const basicDeck = {
  GRGGRGCCCGGG: 2,
  GGGGRGGGGGRG: 3,
  CCCGGGGGGGGG: 4,
}
