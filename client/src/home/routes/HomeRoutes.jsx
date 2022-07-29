import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { Friends, HomePage, ProfilePage } from '../pages'

export const HomeRoutes = () => {
  return (
    <Routes>
    <Route path='/' element={<HomePage />} />
    <Route path='/profile' element={<ProfilePage />} />
    <Route path='/otheruser' element={<Friends />} />

    <Route path='/*' element={<HomePage Navigate to='/' />} />
    </Routes>
  )
}
