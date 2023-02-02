import * as Dialog from '@radix-ui/react-dialog'
import {styled, keyframes} from '../../../stitches.config'
import CInput from '../../Misc/CInput'

export const overlayShow = keyframes({'0%': {opacity: 0}, '100%': {opacity: 1}})

export const contentShow = keyframes({
  '0%': {opacity: 0, transform: 'translate(-50%, -48%) scale(.96)'},
  '100%': {opacity: 1, transform: 'translate(-50%, -50%) scale(1)'},
})

export const StyledOverlay = styled(Dialog.Overlay, {
  backgroundColor: 'rgba(0, 0, 0, 0.33)',
  position: 'fixed',
  inset: '0',
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
})

export const StyledContent = styled(Dialog.Content, {
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

export const StyledTitle = styled(Dialog.Title, {
  margin: '0',
  color: '$dark',
  fontSize: '1.25rem',
  textAlign: 'center',
  marginBottom: '2rem',
})

export const Fieldset = styled('fieldset', {
  all: 'unset',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  gap: '1.25rem',
  alignItems: 'center',
  marginBottom: '$l',
})

export const Label = styled('label', {
  width: '33%',
  textAlign: 'right',
})

export const Input = styled(CInput, {
  all: 'unset',
  width: '100%',
  flex: '1',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$xs',
  padding: '0.5rem 1rem',
  color: '$dark',
  boxShadow: `0 0 0 1px #bbb`,
  '&:disabled': {backgroundColor: '$white'},
  '&:focus': {boxShadow: `0 0 2px 1px $dark`},
})

export const InputWrapper = styled('div', {
  width: '100%',
  flex: '1',
})

export const IconButton = styled('button', {
  all: 'unset',
  fontFamily: 'inherit',
  borderRadius: '100%',
  height: 25,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'lightred',
  position: 'absolute',
  top: 10,
  right: 10,

  '&:hover': {backgroundColor: '$medium'},
  '&:focus': {boxShadow: `0 0 0 2px $medium`},
})

export const Flex = styled('div', {
  display: 'flex',
  justifyContent: 'center',
})
