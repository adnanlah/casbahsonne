import {useLocalStorage} from '@mantine/hooks'
import {tiles} from '../../data/Tiles'
import {TileDataType} from '../../types'
import {Meeple, TileContainer, TileImage} from './style'

type TileProps = {
  tileData: TileDataType
}

function Tile({tileData}: TileProps) {
  const [zoom] = useLocalStorage({key: 'zoom', defaultValue: 1})
  const tileImageUrl = new URL(
    `../assets/${tiles[tileData.id].imageUrl}.png`,
    import.meta.url,
  ).href
  const meepleImageUrl = new URL(
    `../assets/meeple-${tileData.meeple?.id}.png`,
    import.meta.url,
  ).href
  return (
    <TileContainer css={{rotate: tileData.rotationTimes * 90}}>
      <TileImage css={{bgImage: tileImageUrl}}></TileImage>
      {tileData.meeple && (
        <Meeple
          css={{
            size: 20 * zoom,
            bgImage: meepleImageUrl,
            l: tileData.meeple.coords.x * 100 + '%',
            t: tileData.meeple.coords.y * 100 + '%',
          }}
        />
      )}
    </TileContainer>
  )
}

export default Tile
