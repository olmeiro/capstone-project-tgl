import { Navigate, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'

import { HomeRoutes } from '../home/routes/HomeRoutes'
import { Friends, ProfilePage } from '../home/pages'
import { AuthRoutes } from '../auth/AuthRoutes'
import { useAuthStore } from '../hooks'
import LoadingSpinner from '../loading/LoadingSpinner'

export const AppRouter = () => {
  const { status, checkToken } = useAuthStore()

  useEffect(() => {
    checkToken()
  }, [])

 if (status === 'checking') {
    return (
      // aca va el cargando cuando pasa del login a la pagina principal
        <LoadingSpinner />
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
