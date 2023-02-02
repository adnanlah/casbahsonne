import {CoordType} from './types'

export function getOppositeSide(x: number): number {
  return (x + 6 + 2 * (1 - (x % 3))) % 12
}

export function rotatePoint({x, y}: CoordType, angle: number): CoordType {
  const radians = (Math.PI / 180) * angle,
    cos = Math.cos(radians),
    sin = Math.sin(radians),
    rx = Math.round(cos * x + sin * y),
    ry = Math.round(cos * y - sin * x)
  return {x: rx, y: ry}
}

/**
 * Returns a random number between min (inclusive) and max (inclusive)
 */
export const randomInteger = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
