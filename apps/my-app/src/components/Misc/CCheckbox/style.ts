import {styled} from '../../../stitches.config'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'

export const StyledCheckbox = styled(CheckboxPrimitive.Root, {
  all: 'unset',
  backgroundColor: 'white',
  width: '2rem',
  height: '2rem',
  borderRadius: '$xs',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: `0 2px 4px $dark`,
  '&:hover': {backgroundColor: '$white'},
  // "&:focus": { boxShadow: `0 0 0 2px $dark` },
})

export const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
  color: '$dark',
  size: '70%',
})
