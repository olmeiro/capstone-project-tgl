import { Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../components/auth/AuthRoutes'
import { HomeRoutes } from '../components/Home/routes/HomeRoutes'

export const AppRouter = () => {
  return (
    <Routes>
      {/* login y registro */}
      <Route path='/auth/*' element={ <AuthRoutes /> }/>
      {/* Aplicacion */}
      <Route path='/*' element={<HomeRoutes /> }/>
    </Routes>
  )
}
