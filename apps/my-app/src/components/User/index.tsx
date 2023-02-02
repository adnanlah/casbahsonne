import type {PlayerStateType} from '@casbahsonne-monorepo/shared-types'
import {Meeple, Score, UserWrapper} from './style'

type UserProps = {
  user: PlayerStateType
  className?: string
}

function User({user}: UserProps) {
  const meepleImageUrl = new URL(
    `../assets/meeple-${user.id}.png`,
    import.meta.url,
  ).href

  const whiteMeepleImageUrl = new URL(
    `../assets/meeple-white.png`,
    import.meta.url,
  ).href

  return (
    <UserWrapper>
      <Score>{String(user.score).padStart(2, '0')}</Score>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div>{user.name.toUpperCase()}</div>
        <div style={{display: 'flex'}}>
          {[...Array(user.meeplesLeft)].map((_, idx) => (
            <Meeple key={idx} css={{bgImage: meepleImageUrl}} />
          ))}
          {[...Array(7 - user.meeplesLeft)].map((_, idx) => (
            <Meeple key={idx} css={{bgImage: whiteMeepleImageUrl}} />
          ))}
        </div>
      </div>
    </UserWrapper>
  )
}

export default User
