import {RoomMetadataType} from '@casbahsonne-monorepo/shared-types'
import {
  ArrowLeftOnRectangleIcon,
  Cog6ToothIcon,
  PlusIcon,
} from '@heroicons/react/24/solid'
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

import LogoutModal from '../../components/Modals/LogoutModal'
import NewRoomModal from '../../components/Modals/NewRoomModal'
import Room from '../../components/Room'
import {useAuth} from '../../hooks/useAuth'
import {
  IconWrapper,
  LobbyWrapper,
  Logo,
  Menu,
  Nav,
  NewRoom,
  NewRoomIcon,
  NewRoomIconWrapper,
  Profile,
  RoomsContainer,
  RoomsWrapper,
  Title,
} from './style'

function Lobby() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [newRoomModalOpen, setNewRoomModalOpen] = useState(false)
  const [currentUsers, setCurrentUsers] = useState(0)
  const [roomsData, setRoomsData] = useState<RoomMetadataType[]>([])
  const {authed} = useAuth()

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080/lobby')
    socket.addEventListener('message', function message({data}) {
      const {type, content} = JSON.parse(String(data))
      console.log('/lobby, Received', {type, content})
      switch (type) {
        case 'usersCount':
          setCurrentUsers(content)
          break
        case 'rooms':
          setRoomsData(content)
          break
        case 'game started':
          navigate(`/game/${content}`)
      }
    })

    socket.addEventListener('error', function message(ev) {
      console.log('error', ev)
    })

    socket.addEventListener('close', function message(ev) {
      console.log('closed', ev)
    })

    return () => {
      if (socket.readyState === 1) socket.close()
    }
  }, [navigate])

  return (
    <LobbyWrapper>
      <Nav>
        <div>{/* Empty div for Nav flex structure only */}</div>
        <Logo>CASBAHSONNE</Logo>
        <Menu>
          <Profile>
            {authed.username}
            <IconWrapper onClick={() => setOpen(true)}>
              <ArrowLeftOnRectangleIcon />
            </IconWrapper>
          </Profile>
          <IconWrapper>
            <Cog6ToothIcon />
          </IconWrapper>
        </Menu>
      </Nav>

      <RoomsWrapper>
        <Title>CREATE OR JOIN A ROOM</Title>
        <Title>
          {currentUsers} {currentUsers > 1 ? 'users are' : 'user is'} online.
        </Title>
        <RoomsContainer>
          <NewRoom
            key="new-room"
            onClick={() => setNewRoomModalOpen(true)}
            id="new-room"
          >
            <NewRoomIconWrapper>
              <NewRoomIcon>
                <PlusIcon />
              </NewRoomIcon>
            </NewRoomIconWrapper>
          </NewRoom>
          {roomsData
            .sort(
              (a, b) =>
                b.numOfPlayers -
                b.players.length -
                (a.numOfPlayers - a.players.length),
            )
            .map(roomData => (
              <Room key={roomData.id} data={roomData} />
            ))}
        </RoomsContainer>
      </RoomsWrapper>
      <LogoutModal open={open} setOpen={setOpen} />
      <NewRoomModal open={newRoomModalOpen} setOpen={setNewRoomModalOpen} />
    </LobbyWrapper>
  )
}

export default Lobby
