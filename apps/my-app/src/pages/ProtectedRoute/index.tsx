import {AxiosError} from 'axios'
import {useEffect, useState} from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import {axiosInstance} from '../../api/axios'

function ProtectedRoute() {
  const [loading, setLoading] = useState(true)
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    axiosInstance
      .post('/check-auth')
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
  }, [])

  return loading ? (
    <h1>Loading...</h1>
  ) : authed ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  )
}

export default ProtectedRoute
