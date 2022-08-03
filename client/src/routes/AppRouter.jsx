import { Navigate, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'

import { useAuthStore } from '../hooks'
import LoadingSpinner from '../loading/LoadingSpinner'
import { HomePage } from '../components/home/pages/HomePage'
import { ProfilePage } from '../components/home/pages/ProfilePage'
import { Friends } from '../components/home/pages/Friends'
import { LoginPage } from '../components/auth/pages/LoginPage'
import { RegisterPage } from '../components/auth/pages/RegisterPage'
import { ProfilePageOfOneUser } from "../components/home/pages/ProfilePageOfOneUser"

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
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/auth/register" element={<RegisterPage />} />

              <Route path='/*' element={<Navigate to="/auth/login" />} />
            </>
          )
          : (
            <>
              <Route path='/' element={<HomePage />} />
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/friends' element={<Friends />} />
              <Route path='/profile/:userAlias' element={<ProfilePageOfOneUser />} />

              <Route path='/*' element={<Navigate to="/" />} />
            </>
          )
      }
    </Routes>
  )
}
