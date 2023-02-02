import {useLocalStorage} from '@mantine/hooks'
import {FormEventHandler} from 'react'
import {useNavigate} from 'react-router-dom'

import CFButton from '../../components/Misc/CButton'
import {useAuth} from '../../hooks/useAuth'
import {FormWrapper, HomepageWrapper, Logo, Row, TextInput} from './style'

function Homepage() {
  const navigate = useNavigate()
  const auth = useAuth()
  const [inputName, setInputName] = useLocalStorage<string>({
    key: 'input-name',
    defaultValue: '',
  })

  const loginHandler: FormEventHandler<HTMLFormElement> = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()
    if (inputName.length)
      auth
        ?.login(inputName)
        .then(() => {
          navigate('/lobby')
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((err: any) => console.log('error logging in', err.message))
  }

  return (
    <HomepageWrapper>
      <main>
        <Logo>CASBAHSONNE</Logo>
        <form onSubmit={loginHandler}>
          <FormWrapper>
            <Row>
              <TextInput
                placeholder="Type your name"
                type="text"
                maxLength={15}
                spellCheck="false"
                value={inputName}
                onChange={event => {
                  if (/^[A-Za-z0-9_]*$/.test(event.target.value))
                    setInputName(event.target.value)
                }}
              ></TextInput>
            </Row>
            <Row>
              <CFButton color="light">ENTER</CFButton>
            </Row>
          </FormWrapper>
        </form>
      </main>
    </HomepageWrapper>
  )
}

export default Homepage
