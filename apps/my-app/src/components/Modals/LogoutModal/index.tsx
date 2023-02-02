import * as AlertDialog from '@radix-ui/react-alert-dialog'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../../../hooks/useAuth'
import CFButton from '../../Misc/CButton'
import {Flex} from '../Flex'
import {
  StyledAction,
  StyledCancel,
  StyledContent,
  StyledDescription,
  StyledOverlay,
  StyledTitle,
} from './style'

type LogoutModalProps = {
  open: boolean
  setOpen: (v: boolean) => void
}

function LogoutModal({open, setOpen}: LogoutModalProps) {
  const navigate = useNavigate()
  const {logout} = useAuth()

  const logoutHandle = () => {
    console.log('logging out')
    logout()
      .then(() => navigate('/'))
      .catch((err: any) => console.log('Error logging out', err.message))
  }

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Portal>
        <StyledOverlay onClick={() => setOpen(false)} />
        <StyledContent>
          <StyledTitle>Are you sure?</StyledTitle>
          <StyledDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </StyledDescription>
          <Flex>
            <StyledCancel asChild>
              <CFButton>STAY</CFButton>
            </StyledCancel>
            <StyledAction asChild>
              <CFButton onClick={logoutHandle}>LOGOUT</CFButton>
            </StyledAction>
          </Flex>
        </StyledContent>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}

export default LogoutModal
