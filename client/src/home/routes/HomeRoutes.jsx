import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { HomePage, UserPage, ProfilePage } from '../pages'

export const HomeRoutes = () => {
  return (
    <Routes>
    <Route path='/' element={<HomePage />} />
    <Route path='/profile' element={<ProfilePage />} />
    <Route path='/otheruser' element={<UserPage />} />

    <Route path='/*' element={<HomePage Navigate to='/' />} />
    </Routes>
  )
}
