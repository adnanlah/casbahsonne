import {styled} from '../../stitches.config'

export const LobbyWrapper = styled('main', {
  minHeight: '100vh',
  background: '$dark',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

export const Nav = styled('nav', {
  width: '80%',
  display: 'flex',
  justifyContent: 'space-between',
  margin: '3rem 0',
  '& > *': {width: '30%'},
})

export const Logo = styled('h1', {
  fontSize: '2.5rem',
  lineHeight: '2.5rem',
  textAlign: 'center',
  color: '$white',
})

export const Menu = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
})

export const RoomsWrapper = styled('main', {
  width: '80%',
})

export const RoomsContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: '1rem',
})

export const Title = styled('h2', {
  fontSize: '1.5rem',
  color: '$white',
  marginBottom: '1.5rem',
  textAlign: 'center',
})

export const Profile = styled('div', {
  marginRight: '.5rem',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '1rem',
  backgroundColor: '#222',
  color: '$white',
  padding: '0.5rem 1rem',
  cursor: 'pointer',
})

export const IconWrapper = styled('div', {
  size: '1.5rem',
  color: 'white',
  marginLeft: 5,
})

export const NewRoom = styled('div', {
  borderRadius: '1rem',
  border: '2px dashed $white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  boxShadow: '1px 2px 4px $dark',
})

export const NewRoomIconWrapper = styled('div', {
  width: '6rem',
  height: '6rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1rem',
  border: '2px dashed $white',
  borderRadius: '100%',
})

export const NewRoomIcon = styled('div', {
  width: '75%',
  height: '75%',
  color: '$white',
})
