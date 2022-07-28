import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/AuthRoutes'
import { HomeRoutes } from '../home/routes/HomeRoutes'
import { useAuthStore } from '../hooks'

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
                <Route path='/auth/*' element={ <AuthRoutes /> }/>
                <Route path='/*' element={<Navigate to="/auth/login" />}/>
              </>
            )
          : (
            <>
              <Route path='/' element={<HomeRoutes /> }/>
              <Route path='/*' element={<Navigate to="/" />}/>
            </>
            )
      }
    </Routes>
  )
}
