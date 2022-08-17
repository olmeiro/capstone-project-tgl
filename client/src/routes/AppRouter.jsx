import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { useAuthStore } from '../hooks'
import { ProfilePageOfOneUser } from '../components/home/pages/ProfilePageOfOneUser'
import { RegisterPage } from '../components/auth/pages/RegisterPage'
import { ProfilePage } from '../components/home/pages/ProfilePage'
import LoadingSpinner from '../components/loading/LoadingSpinner'
import { LoginPage } from '../components/auth/pages/LoginPage'
import { Favorites } from '../components/home/pages/Favorites'
import { Messenger } from '../components/home/pages/Messenger'
import { HomePage } from '../components/home/pages/HomePage'
import { Friends } from '../components/home/pages/Friends'

export const AppRouter = () => {
  const { status, checkToken } = useAuthStore()

  useEffect(() => {
    checkToken()
  }, [])

  if (status === 'checking') {
    return <LoadingSpinner />
  }

  return (
    <div className="bg-purple-100">
      <Routes>
        {status === 'not-authenticated'
          ? (
          <>
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />

            <Route path="/*" element={<Navigate to="/auth/login" />} />
          </>
            )
          : (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/:userAlias" element={<ProfilePageOfOneUser />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/messenger" element={<Messenger />} />

            <Route path="/*" element={<Navigate to="/" />} />
          </>
            )}
      </Routes>
    </div>
  )
}
