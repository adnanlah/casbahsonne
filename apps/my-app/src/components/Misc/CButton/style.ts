import {styled} from '../../../stitches.config'

export const ButtonStyled = styled('button', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  border: 'none',
  boxShadow: '1px 2px 3px $dark',
  padding: '$s $l',
  borderRadius: '$m',
  cursor: 'pointer',
  variants: {
    color: {
      dark: {
        backgroundColor: '$dark',
        color: '$white',
        boxShadow: '1px 2px 3px $dark',
      },
      light: {
        backgroundColor: '$white',
        color: '$dark',
      },
    },
    disabled: {
      true: {
        backgroundColor: '$medium',
        color: '$white',
        cursor: 'inherit',
        boxShadow: '1px 2px 3px $medium',
      },
    },
  },
  defaultVariants: {
    color: 'dark',
  },
})
