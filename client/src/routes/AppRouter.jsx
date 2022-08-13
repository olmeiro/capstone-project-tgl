import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { useAuthStore } from '../hooks'
import LoadingSpinner from '../components/loading/LoadingSpinner'
import { HomePage } from '../components/home/pages/HomePage'
import { ProfilePage } from '../components/home/pages/ProfilePage'
import { Friends } from '../components/home/pages/Friends'
import { LoginPage } from '../components/auth/pages/LoginPage'
import { RegisterPage } from '../components/auth/pages/RegisterPage'

import { ProfilePageOfOneUser } from '../components/home/pages/ProfilePageOfOneUser'
import { Favorites } from '../components/home/pages/Favorites'
import { Messenger } from '../components/home/pages/Messenger'

export const AppRouter = () => {
  const { status, checkToken } = useAuthStore()

  useEffect(() => {
    checkToken()
  }, [])

  if (status === 'checking') {
    return (
      <LoadingSpinner />
    )
  }

  return (
    <div className='bg-purple-100'>
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
              <Route path='/favorites' element={<Favorites />} />
              <Route path='/messenger' element={<Messenger />} />

                <Route path='/*' element={<Navigate to="/" />} />
              </>
              )
        }
      </Routes>
    </div>
  )
}
