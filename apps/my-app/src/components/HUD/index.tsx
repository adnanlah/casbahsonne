import {useLocalStorage} from '@mantine/hooks'
import {Cog6ToothIcon} from '@heroicons/react/24/solid'
import User from '../User'
import {
  FooterWrapper,
  HUDWrapper,
  IconWrapper,
  NavWrapper,
  UsersWrapper,
} from './style'
import type {PlayerStateType} from '@casbahsonne-monorepo/shared-types'

type UsersType = PlayerStateType & {hisTurn: boolean}

type HUDProps = {
  users: UsersType[]
}

function HUD({users}: HUDProps) {
  const [zoom, setZoom] = useLocalStorage({key: 'zoom', defaultValue: 1})

  return (
    <HUDWrapper>
      <NavWrapper>
        <UsersWrapper>
          {users.map((user, idx) => (
            <User key={`${idx}-${user.id}`} user={user} />
          ))}
        </UsersWrapper>
        <IconWrapper>
          <Cog6ToothIcon />
        </IconWrapper>
      </NavWrapper>
      <FooterWrapper>
        <input
          type="range"
          min="0.7"
          step="0.05"
          max="1.3"
          value={zoom}
          onChange={ev => {
            setZoom(parseFloat(ev.target.value))
          }}
        ></input>
      </FooterWrapper>
    </HUDWrapper>
  )
}

export default HUD
