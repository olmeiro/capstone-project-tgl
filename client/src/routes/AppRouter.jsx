import { Navigate, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'

import { HomeRoutes } from '../home/routes/HomeRoutes'
import { Friends, ProfilePage } from '../home/pages'
import { AuthRoutes } from '../auth/AuthRoutes'
import { useAuthStore } from '../hooks'

export const AppRouter = () => {
  const { status, checkToken } = useAuthStore()

  useEffect(() => {
    checkToken()
  }, [])

  if (status === 'checking') {
    return (
      <h3>Cargando...</h3>
    )
  }

  return (
    <Routes>
      {
        (status === 'not-authenticated')
          ? (
              <>
                <Route path='/auth/*' element={ <AuthRoutes /> }/>
                <Route path='/*' element={<Navigate to="/auth/login" />}/>
              </>
            )
          : (
            <>
              <Route path='/*' element={<HomeRoutes /> }/>
              <Route path='/profile' element={<ProfilePage /> }/>
              <Route path='/friends' element={<Friends /> }/>
              <Route path='/*' element={<Navigate to="/" />}/>
            </>
            )
      }
    </Routes>
  )
}
