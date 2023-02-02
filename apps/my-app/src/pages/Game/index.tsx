import HUD from '../../components/HUD'
import MapDisplay from '../../components/MapDisplay'
import {MapType, PlacementsMapType} from '../../types'
import {GameWrapper} from './style'

function Game() {
  const map: MapType = {
    0: {
      0: {
        id: `CCCGGGGGGGGG`,
        rotationTimes: 0,
        meeple: {
          id: 1,
          coords: {
            x: 0.3,
            y: 0.5,
          },
        },
      },
      1: {
        id: `CCCGGGGGGGGG`,
        rotationTimes: 1,
        meeple: {
          id: 2,
          coords: {
            x: 0.3,
            y: 0.5,
          },
        },
      },
    },
    '-1': {
      0: {
        id: `CCCGGGGGGGGG`,
        rotationTimes: 2,
        meeple: {
          id: 3,
          coords: {
            x: 0.3,
            y: 0.5,
          },
        },
      },
    },
  }

  const placementsMap: PlacementsMapType = {
    0: {
      3: {
        id: `CCCGGGGGGGGG`,
        possibleRotations: [0],
      },
      4: {
        id: `CCCGGGGGGGGG`,
        possibleRotations: [0, 1],
      },
    },
    '-1': {
      2: {
        id: `CCCGGGGGGGGG`,
        possibleRotations: [0, 2],
      },
    },
  }

  return (
    <GameWrapper>
      <HUD
        users={[
          {
            id: '1',
            name: 'lahrech',
            meeplesLeft: 4,
            hisTurn: false,
            score: 1,
            connected: true,
          },
          {
            id: '2',
            name: 'ad3n',
            meeplesLeft: 7,
            hisTurn: true,
            score: 10,
            connected: true,
          },
          {
            id: '3',
            name: 'abdelrahman',
            meeplesLeft: 0,
            hisTurn: true,
            score: 120,
            connected: true,
          },
          {
            id: '4',
            name: 'oussama',
            meeplesLeft: 2,
            hisTurn: true,
            score: 68,
            connected: true,
          },
        ]}
      />
      <MapDisplay map={map} placementsMap={placementsMap} />
    </GameWrapper>
  )
}

export default Game
