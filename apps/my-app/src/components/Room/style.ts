import {styled} from '../../stitches.config'
import {grass} from '@radix-ui/colors'

export const RoomWrapper = styled('article', {
  background: '$white',
  textAlign: 'center',
  padding: '$l $xl',
  borderRadius: '$m',
  minHeight: '15rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '1px 2px 4px $dark',

  variants: {
    joined: {
      true: {
        background: 'DarkKhaki',
      },
    },
  },
})

export const RoomName = styled('h4', {
  fontSize: '$l',
  marginBottom: '$l',
})

export const Players = styled('div', {
  marginBottom: '$l',
})

export const Status = styled('div', {
  fontSize: '$s',
  marginBottom: '$l',
  variants: {
    color: {
      green: {
        color: grass.grass10,
      },
    },
  },
})
