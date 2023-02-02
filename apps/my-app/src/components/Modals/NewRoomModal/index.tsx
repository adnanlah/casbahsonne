import {XMarkIcon} from '@heroicons/react/24/solid'
import * as Dialog from '@radix-ui/react-dialog'
import {ChangeEvent, FormEventHandler, useEffect, useRef, useState} from 'react'
import {useAuth} from '../../../hooks/useAuth'
import CFButton from '../../Misc/CButton'
import {axiosInstance} from '../../../api/axios'
import CCheckbox from '../../Misc/CCheckbox'
import BoxesSelect from '../../Misc/BoxesSelect'
import {useLocalStorage} from '@mantine/hooks'
import {
  Fieldset,
  Flex,
  IconButton,
  Input,
  InputWrapper,
  Label,
  StyledContent,
  StyledOverlay,
  StyledTitle,
} from './style'

type NewRoomModalProps = {
  open: boolean
  setOpen: (v: boolean) => void
}

function NewRoomModal({open, setOpen}: NewRoomModalProps) {
  const {authed} = useAuth()
  const [, setUserId] = useLocalStorage({key: 'user-id', defaultValue: ''})
  const [roomName, setRoomName] = useState(`${authed.username}'s room`)
  const [numOfPlayers, setNumOfPlayers] = useState(2)
  const [withPassword, setWithPassword] = useState(false)
  const [roomPassword, setRoomPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const roomPasswordInputRef = useRef<HTMLInputElement>(null)

  const formHandler: FormEventHandler<HTMLFormElement> = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()
    setLoading(true)
    axiosInstance
      .post('/create-room', {
        name: roomName,
        password: roomPassword,
        numOfPlayers,
        watchable: false,
      })
      .then(response => {
        const {data} = response
        setUserId(data.userId)
        setLoading(false)
        setOpen(false)
      })
      .catch((err: any) => {
        setLoading(false)
        console.log(err.message)
      })
  }

  useEffect(() => {
    if (withPassword) roomPasswordInputRef?.current?.focus()
  }, [withPassword])

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <StyledOverlay />
        <StyledContent>
          <StyledTitle>CREATE A NEW ROOM</StyledTitle>
          <form onSubmit={formHandler}>
            <Fieldset>
              <Label htmlFor="room-name">Name:</Label>
              <Input
                id="room-name"
                value={roomName}
                onChange={(ev: ChangeEvent<HTMLInputElement>) =>
                  setRoomName(ev.target.value)
                }
              />
            </Fieldset>
            <Fieldset>
              <Label htmlFor="number-of-players">Number of players:</Label>
              <InputWrapper>
                <BoxesSelect
                  options={[2, 3, 4]}
                  selected={numOfPlayers}
                  onSelect={value => setNumOfPlayers(value)}
                />
              </InputWrapper>
            </Fieldset>
            <Fieldset>
              <Label htmlFor="with-password">Lock with password:</Label>
              <InputWrapper>
                <CCheckbox
                  id="with-password"
                  checked={withPassword}
                  onCheckedChange={() => {
                    setRoomPassword('')
                    setWithPassword(s => !s)
                  }}
                />
              </InputWrapper>
            </Fieldset>
            <Fieldset>
              <Label htmlFor="room-password">Password:</Label>
              <Input
                ref={roomPasswordInputRef}
                id="room-password"
                value={roomPassword}
                disabled={!withPassword}
                onChange={(ev: ChangeEvent<HTMLInputElement>) =>
                  setRoomPassword(ev.target.value)
                }
              />
            </Fieldset>
            <Flex>
              <CFButton type="submit">
                {loading ? 'CREATING...' : 'CREATE'}
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

export default NewRoomModal
