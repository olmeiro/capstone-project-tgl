import { Navigate, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'

import { Friends, HomePage, ProfilePage } from '../home/pages'
import { useAuthStore } from '../hooks'
import { LoginPage, RegisterPage } from '../auth/pages'

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
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/register" element={<RegisterPage />} />

                <Route path='/*' element={<Navigate to="/auth/login" />}/>
              </>
            )
          : (
            <>
              <Route path='/' element={<HomePage /> }/>
              <Route path='/profile' element={<ProfilePage /> }/>
              <Route path='/friends' element={<Friends /> }/>

              <Route path='/*' element={<Navigate to="/" />}/>
            </>
            )
      }
    </Routes>
  )
}
