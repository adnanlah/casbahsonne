import {useLocalStorage} from '@mantine/hooks'
import {useWindowSize} from '@react-hook/window-size'
import {useEffect, useState} from 'react'
import Draggable from 'react-draggable'

import {MapType, PlacementsMapType} from '../../types'
import Tile from '../Tile'
import TilePlacement from '../TilePlacement'
import TileWrapper from '../TileWrapper'
import {Fullscreen, MapWrapper} from './style'

type MapDisplayType = {
  map: MapType
  placementsMap: PlacementsMapType
}

function MapDisplay({map, placementsMap}: MapDisplayType) {
  const [windowWidth, windowHeight] = useWindowSize()
  const [zoom, setZoom] = useLocalStorage({key: 'zoom', defaultValue: 1})
  const [isDragging, setIsDragging] = useState(false)
  const mapElements: JSX.Element[] = []
  const minWidth = -3
  const maxWidth = 3
  const minHeight = -3
  const maxHeight = 3

  useEffect(() => {
    const onESC = (ev: KeyboardEvent) => {
      if (ev.key === '1') {
        setZoom(s => (s < 0.7 ? s : s - 0.05))
      } else if (ev.key === '2') {
        setZoom(s => (s > 1.3 ? s : s + 0.05))
      }
    }
    window.addEventListener('keyup', onESC, false)
    return () => {
      window.addEventListener('keyup', onESC, false)
    }
  }, [setZoom])

  for (let yIdx = minHeight; yIdx <= maxHeight; yIdx++) {
    const lineElements: JSX.Element[] = []
    for (let xIdx = minWidth; xIdx <= maxWidth; xIdx++) {
      if (map[yIdx]) {
        if (map[yIdx][xIdx]) {
          lineElements.push(
            <TileWrapper key={`${yIdx}-${xIdx}`}>
              <Tile tileData={map[yIdx][xIdx]} />
            </TileWrapper>,
          )
        } else if (placementsMap[yIdx][xIdx]) {
          lineElements.push(
            <TileWrapper key={`${yIdx}-${xIdx}`}>
              <TilePlacement
                tileId={placementsMap[yIdx][xIdx].id}
                possibleRotations={placementsMap[yIdx][xIdx].possibleRotations}
              />
            </TileWrapper>,
          )
        } else {
          lineElements.push(<TileWrapper key={`${yIdx}-${xIdx}`} />)
        }
      }
    }
    mapElements.push(
      <div
        style={{display: 'flex', backgroundColor: 'rgba(255, 255, 255, .1)'}}
        key={`${yIdx}`}
      >
        {lineElements}
      </div>,
    )
  }
  const tileSize = 100 * zoom
  const tilesWidth = tileSize * (maxWidth - minWidth + 1)
  const tilesHeight = tileSize * (maxHeight - minHeight + 1)
  return (
    <Draggable
      positionOffset={{x: '-50%', y: '-50%'}}
      bounds={{
        left: -(tilesWidth / 2 + windowWidth / 2 - tileSize),
        top: -(tilesHeight / 2 + windowHeight / 2 - tileSize),
        right: tilesWidth / 2 + windowWidth / 2 - tileSize,
        bottom: tilesHeight / 2 + windowHeight / 2 - tileSize,
      }}
      onStart={() => setIsDragging(true)}
      onStop={() => setIsDragging(false)}
    >
      <Fullscreen
        css={{
          w: tilesWidth + windowWidth * 2,
          h: tilesHeight + windowHeight * 2,
        }}
        isDragging={isDragging}
      >
        <MapWrapper>{mapElements}</MapWrapper>
      </Fullscreen>
    </Draggable>
  )
}

export default MapDisplay
