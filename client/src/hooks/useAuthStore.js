import { useDispatch, useSelector } from 'react-redux'
import { socialApi } from '../api'
import { clearErrorMessage, onChecking, onLogin, onLogout, onRegister } from '../store'

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const startLogin = async ({ username, password }) => {
    dispatch(onChecking())
    try {
      const { data } = await socialApi.post('/login', { username, password })
      // localStorage.setItem('token', data.data.token)
      localStorage.setItem('token-init-data', new Date().getTime())
      dispatch(onLogin({ username: data.data.username, rol: data.data.rol }))
    } catch (error) {
      dispatch(onLogout('Error de autenticación'))
      setTimeout(() => {
        dispatch(clearErrorMessage())
      })
    }
  }

  const startRegister = async ({ email, pw }) => {
    dispatch(onChecking())
    try {
      const { data } = await socialApi.post('/new', { username: email, password: pw })
      // localStorage.setItem('token', data.token)
      // localStorage.setItem('token-init', new Date().getTime())
      dispatch(onLogin({ username: data.username, password: data.password }))
    } catch (error) {
      console.log(error)
      dispatch(onLogout('Error en el registro'))
    }
  }

  return {
    // propiedades
    errorMessage,
    status,
    user,
    // metodos
    startLogin,
    startRegister
  }
}
