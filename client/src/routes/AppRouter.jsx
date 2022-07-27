import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/AuthRoutes'
import { HomeRoutes } from '../home/routes/HomeRoutes'

export const AppRouter = () => {
  const authStatus = 'not-authenticate'
  return (
    <Routes>
      {
        (authStatus === 'not-authenticate')
          ? <Route path='/auth/*' element={ <AuthRoutes /> }/>
          : <Route path='/*' element={<HomeRoutes /> }/>
      }
      <Route path='/*' element={<Navigate to="/auth/login" />}/>
    </Routes>
  )
}
