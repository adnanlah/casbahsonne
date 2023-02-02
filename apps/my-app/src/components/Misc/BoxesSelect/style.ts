import {styled} from '@stitches/react'

export const BoxesList = styled('div', {
  display: 'flex',
  gap: '$m',
})

export const Box = styled('div', {
  padding: '$s $m',
  borderRadius: '$m',
  fontWeight: 'bold',
  cursor: 'pointer',
  variants: {
    selected: {
      true: {
        background: '$medium',
      },
      false: {
        '&:hover': {
          background: '$light',
        },
      },
    },
  },
})
