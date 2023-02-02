import {LockClosedIcon, EyeIcon, EyeSlashIcon} from '@heroicons/react/24/solid'
import {useState} from 'react'
import type {RoomMetadataType} from '@casbahsonne-monorepo/shared-types'
import CFButton from '../Misc/CButton'
import JoinRoomModal from '../Modals/JoinRoomModal'
import {axiosInstance} from '../../api/axios'
import {useAuth} from '../../hooks/useAuth'
import {Players, RoomName, RoomWrapper, Status} from './style'

type RoomProps = {
  data: RoomMetadataType
}

function Room({data}: RoomProps) {
  const [open, setOpen] = useState(false)
  const {authed} = useAuth()

  const leaveRoom = () => {
    axiosInstance
      .post('/leave-room')
      .then(response => console.log('logged out', response))
      .catch((err: unknown) => console.log(err))
  }

  const joinButton = (
    <CFButton onClick={() => setOpen(true)}>
      {data.password && (
        <LockClosedIcon style={{marginRight: '.5rem', height: '1rem'}} />
      )}
      <div>JOIN</div>
    </CFButton>
  )

  const watchButton = (
    <CFButton disabled={!data.watchable} onClick={() => setOpen(true)}>
      {data.watchable ? (
        <EyeIcon style={{marginRight: '.5rem', height: '1rem'}} />
      ) : (
        <EyeSlashIcon style={{marginRight: '.5rem', height: '1rem'}} />
      )}
      <div>WATCH</div>
    </CFButton>
  )

  const leaveButton = (
    <CFButton onClick={() => leaveRoom()}>
      <div>LEAVE</div>
    </CFButton>
  )

  let actionElement

  const isJoined = data.players.some(p => p.id === authed.userId)

  if (isJoined) {
    actionElement = leaveButton
  } else if (data.roomStatus === 'playing') {
    actionElement = watchButton
  } else if (data.roomStatus === 'pending') {
    actionElement = joinButton
  }

  return (
    <RoomWrapper joined={isJoined}>
      <div>
        <RoomName>
          {data.name}
          {/* ({data.players.length}/{data.numOfPlayers}) */}
        </RoomName>
        <Status color="green">
          {data.players.length < data.numOfPlayers ? 'PENDING' : 'PLAYING'}
        </Status>
        <Players>
          {data.players.map((player, idx) => (
            <p key={`${player}-${idx}`}>{player.name.toUpperCase()}</p>
          ))}
          {[...Array(data.numOfPlayers - data.players.length)].map((_, idx) => (
            <p key={idx}>...</p>
          ))}
        </Players>
      </div>
      {actionElement}
      <JoinRoomModal open={open} setOpen={setOpen} roomId={data.id} />
    </RoomWrapper>
  )
}

export default Room
