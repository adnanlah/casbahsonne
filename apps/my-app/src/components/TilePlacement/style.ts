import {styled} from '../../stitches.config'

export const Outer = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  position: 'relative',
})

export const Inner = styled('div', {
  width: '90%',
  height: '90%',
  borderRadius: '$m',
  border: '2px dotted rgba(255,255,255,0.7)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const TileImage = styled('div', {
  width: '100%',
  height: '100%',
  // backgroundImage: `url(${imageUrl})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'top center',
  filter: 'contrast(130%)',
  // transform: `rotate(${rotationDeg}deg)`,
  transition: 'all .05s ease-out',
  position: 'absolute',
  top: '0',
  left: '0',
})

export const RotateIcon = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  zIndex: 99,
  position: 'absolute',
  top: '0',
  left: '0',
})
