import * as AlertDialog from '@radix-ui/react-alert-dialog'
import {styled, keyframes} from '../../../stitches.config'

export const overlayShow = keyframes({'0%': {opacity: 0}, '100%': {opacity: 1}})

export const contentShow = keyframes({
  '0%': {opacity: 0, transform: 'translate(-50%, -48%) scale(.96)'},
  '100%': {opacity: 1, transform: 'translate(-50%, -50%) scale(1)'},
})

export const StyledOverlay = styled(AlertDialog.Overlay, {
  backgroundColor: 'rgba(0, 0, 0, 0.33)',
  position: 'fixed',
  inset: '0',
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
})

export const StyledContent = styled(AlertDialog.Content, {
  backgroundColor: 'white',
  borderRadius: '$m',
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px,\n    hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '500px',
  maxHeight: '85vh',
  padding: '2rem',
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
})

export const StyledTitle = styled(AlertDialog.Title, {
  margin: '0',
  color: '$dark',
  fontSize: '1.25rem',
})

export const StyledDescription = styled(AlertDialog.Description, {
  marginBottom: '2rem',
  color: '#555',
})

export const StyledAction = styled(AlertDialog.Action, {})

export const StyledCancel = styled(AlertDialog.Cancel, {
  marginRight: '$s',
})

export const Flex = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
})
