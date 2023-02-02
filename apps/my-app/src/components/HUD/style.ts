import {styled} from '../../stitches.config'

export const HUDWrapper = styled('nav', {
  width: '80vw',
  height: '80vh',
  padding: '$xl',
  // background: 'red',
  border: '1px solid red',
})

export const NavWrapper = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxSizing: 'border-box',
  zIndex: 99,
  position: 'absolute',
  top: 20,
})

export const UsersWrapper = styled('div', {
  display: 'flex',
  gap: '$xl',
})

export const FooterWrapper = styled('div', {
  display: 'flex',
  zIndex: 99,
  padding: '0 80px',
  position: 'absolute',
  bottom: 20,
  right: 0,
})

export const IconWrapper = styled('div', {
  width: 40,
  height: 40,
  color: 'white',
})
