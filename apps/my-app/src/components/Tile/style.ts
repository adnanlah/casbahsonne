import {styled} from '../../stitches.config'

export const TileContainer = styled('div', {
  width: '100%',
  height: '100%',
  position: 'relative',
})

export const TileImage = styled('div', {
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'top center',
})

export const Meeple = styled('div', {
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'top center',
})
