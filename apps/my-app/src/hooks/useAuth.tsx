import {useLocalStorage} from '@mantine/hooks'
import {createContext, ReactNode, useContext, useMemo} from 'react'
import {axiosInstance} from '../api/axios'
import {UserProfileType} from '../types'

type AuthProviderProps = {
  children: ReactNode
}

type ContextState = {
  authed: UserProfileType
  login: (name: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext({} as ContextState)

export function AuthProvider({children}: AuthProviderProps) {
  const [authed, setAuthed] = useLocalStorage<UserProfileType>({
    key: 'use-profile',
    defaultValue: {username: '', userId: ''},
  })

  const value = useMemo(
    () => ({
      authed,
      login: (username: string) => {
        return new Promise<void>((resolve, reject) => {
          axiosInstance
            .post('/login', {username})
            .then(({data}) => {
              console.log('logged in', data)
              setAuthed({username: data.username, userId: data.userId})
              resolve()
            })
            .catch((err: any) => {
              reject(err)
            })
        })
      },
      logout: () => {
        return new Promise<void>((resolve, reject) => {
          axiosInstance
            .post('/logout')
            .then(() => {
              setAuthed({username: '', userId: ''})
              resolve()
            })
            .catch((err: any) => {
              reject(err)
            })
        })
      },
    }),
    [authed, setAuthed],
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
