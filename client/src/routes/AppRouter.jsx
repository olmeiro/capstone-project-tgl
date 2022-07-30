import { Navigate, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'

import { useAuthStore } from '../hooks'
import { HomePage } from '../components/home/pages/HomePage'
import { ProfilePage } from '../components/home/pages/ProfilePage'
import { Friends } from '../components/home/pages/Friends'
import { LoginPage } from '../components/auth/pages/LoginPage'
import { RegisterPage } from '../components/auth/pages/RegisterPage'

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
