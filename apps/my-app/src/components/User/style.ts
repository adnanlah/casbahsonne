import {styled} from '../../stitches.config'

export const UserWrapper = styled('div', {
  display: 'flex',
  alignItems: 'stretch',
  backgroundColor: 'rgba(255,255,255,1)',
  overflow: 'hidden',
  width: 200,
  padding: '$xs',
  borderRadius: '$m',
  zIndex: 99,
})

export const Score = styled('div', {
  display: 'flex',
  alignItems: 'center',
  fontSize: '$l',
  padding: '$s',
  marginRight: '$s',
  borderRadius: '$m',
  backgroundColor: '#ccc',
})

export const Meeple = styled('div', {
  size: '2rem',
  marginRight: 1,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'top center',
})
