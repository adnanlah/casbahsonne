import {styled} from '../../stitches.config'

export const Fullscreen = styled('div', {
  backgroundColor: '$dark',
  position: 'absolute',
  top: '50%',
  left: '50%',
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  variants: {
    isDragging: {
      true: {
        cursor: 'grabbing',
      },
      false: {
        cursor: 'grab',
      },
    },
  },
})

export const MapWrapper = styled('div', {
  color: 'white',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
})
