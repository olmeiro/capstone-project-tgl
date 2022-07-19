import { Routes, Route } from 'react-router-dom'

import { HomePage } from '../pages/HomePage'
import { ProfilePage } from '../pages/ProfilePage'
import { UserPage } from '../pages/UserPage'

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
