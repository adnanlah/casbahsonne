import {AxiosError} from 'axios'
import {useEffect, useState} from 'react'
import {matchRoutes, Navigate, Outlet, useLocation} from 'react-router-dom'
import {axiosInstance} from '../../api/axios'

const routes = [{path: '/game/:id'}]

function GameProtectedRoute() {
  const [loading, setLoading] = useState(true)
  const [authed, setAuthed] = useState(false)
  const location = useLocation()
  const match = matchRoutes(routes, location)

  useEffect(() => {
    axiosInstance
      .post('/check-ingame', {
        roomId: match?.['0'].params.id,
      })
      .then(() => {
        setLoading(false)
        setAuthed(true)
      })
      .catch((err: AxiosError) => {
        console.log('error checking in', err.message)
        setLoading(false)
        setAuthed(false)
      })

    // return () => {}
  }, [match])

  return loading ? (
    <h1>Loading...</h1>
  ) : authed ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  )
}

export default GameProtectedRoute
