import {globalCss, styled} from '../../stitches.config'
import CInput from '../../components/Misc/CInput'

export const HomepageWrapper = styled('div', {
  fontSize: '1.25rem',
  width: '100vw',
  height: '100vh',
  backgroundColor: '$dark',
  color: '$white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const Logo = styled('h1', {
  fontSize: '5rem',
  lineHeight: '5rem',
  marginBottom: '3.5rem',
})

export const FormWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

export const TextInput = styled(CInput, {
  fontSize: '1.25rem',
  padding: '0.5rem 1.5rem',
  borderRadius: '1rem',
  textAlign: 'center',
  border: 'none',
  '&:focus': {outline: 'none', border: 'none'},
})

export const Row = styled('div', {
  marginBottom: '1rem',
})
