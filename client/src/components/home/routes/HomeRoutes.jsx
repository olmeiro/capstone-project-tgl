import { Routes, Route } from 'react-router-dom'
import Prueba from '../pages/Prueba'

import { HomePage } from '../pages/HomePage'
import { ProfilePage } from '../pages/ProfilePage'
import { UserPage } from '../pages/UserPage'

export const HomeRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='/otheruser' element={<UserPage />} />
      <Route path='/prueba' element={<Prueba />} />

      <Route path='/*' element={<HomePage Navigate to='/' />} />
    </Routes>
  )
}
