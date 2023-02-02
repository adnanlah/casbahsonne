import {useState} from 'react'
import {tiles} from '../../data/Tiles'
import {Inner, Outer, RotateIcon, TileImage} from './style'

type TilePlacementProps = {
  tileId: string
  possibleRotations: number[]
}

function TilePlacement({tileId, possibleRotations}: TilePlacementProps) {
  const [showTile, setShowTile] = useState(false)
  const [currentDegree, setCurrentDegree] = useState(0)
  const imgUrl = new URL(
    `../assets/${tiles[tileId].imageUrl}.png`,
    import.meta.url,
  ).href

  const clickHandler = (ev: any) => {
    if (ev.button === 0) {
      setCurrentDegree(s => s + 1)
    } else if (ev.button === 2) {
    }
  }

  return (
    <Outer
      onMouseOver={() => setShowTile(true)}
      onMouseLeave={() => {
        setShowTile(false)
        setCurrentDegree(0)
      }}
    >
      {showTile && (
        <>
          <TileImage
            css={{
              bgImage: imgUrl,
              rotate:
                possibleRotations[currentDegree % possibleRotations.length] *
                90,
            }}
          />
          <RotateIcon onMouseDown={clickHandler}>
            <div style={{width: '40%', height: '40%'}}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </div>
          </RotateIcon>
        </>
      )}
      {!showTile && (
        <Inner>
          <div style={{width: '50%', height: '50%'}}>
            <svg
              style={{color: 'rgba(255,255,255,0.7)'}}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={0.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 6v12m6-6H6"
              />
            </svg>
          </div>
        </Inner>
      )}
    </Outer>
  )
}

export default TilePlacement
