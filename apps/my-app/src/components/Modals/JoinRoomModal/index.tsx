import {XMarkIcon} from '@heroicons/react/24/solid'
import * as Dialog from '@radix-ui/react-dialog'
import {FormEventHandler, useState} from 'react'
import CFButton from '../../Misc/CButton'
import {Flex} from '../Flex'
import {axiosInstance} from '../../../api/axios'
import {
  Fieldset,
  IconButton,
  Input,
  Label,
  StyledContent,
  StyledOverlay,
  StyledTitle,
} from './style'

type JoinRoomModalProps = {
  open: boolean
  setOpen: (v: boolean) => void
  roomId: string
}

function JoinRoomModal({open, setOpen, roomId}: JoinRoomModalProps) {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const formHandler: FormEventHandler<HTMLFormElement> = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()
    setLoading(true)
    axiosInstance
      .post('/join-room', {roomId, password})
      .then(() => {
        setLoading(false)
        setOpen(false)
      })
      .catch((err: any) => {
        setLoading(false)
        console.log(err, err.message)
      })
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <StyledOverlay />
        <StyledContent>
          <StyledTitle>Create a new room</StyledTitle>
          <form onSubmit={formHandler}>
            <Fieldset>
              <Label htmlFor="room-passoword">Passowrd:</Label>
              <Input
                id="room-passoword"
                value={password}
                onChange={ev => setPassword(ev.target.value)}
              />
            </Fieldset>
            <Flex>
              <CFButton type="submit">
                {loading ? 'JOINING...' : 'JOIN'}
              </CFButton>
            </Flex>
          </form>
          <Dialog.Close asChild>
            <IconButton>
              <XMarkIcon />
            </IconButton>
          </Dialog.Close>
        </StyledContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default JoinRoomModal
