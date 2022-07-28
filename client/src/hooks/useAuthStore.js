import { useDispatch, useSelector } from 'react-redux'
import { socialApi } from '../api'
import { clearErrorMessage, onChecking, onLogin, onLogout, onRegister } from '../store'

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const startLogin = async ({ alias, contraseña }) => {
    dispatch(onChecking())
    try {
      const { data } = await socialApi.post('/usuarios/login', { alias, contraseña })
      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-data', new Date().getTime())
      dispatch(onLogin({ alias: data.user.alias, nombre: data.user.nombre }))
    } catch (error) {
      dispatch(onLogout('Error de autenticación'))
      setTimeout(() => {
        dispatch(clearErrorMessage())
      })
    }
  }

  const startRegister = async ({ alias, nombre, email, telefono, contraseña }) => {
    console.log({ alias, nombre, email, telefono, contraseña })
    dispatch(onChecking())
    try {
      const { data } = await socialApi.post('/usuarios', { alias, nombre, email, telefono, contraseña })
      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init', new Date().getTime())
      dispatch(onLogin({ alias: data.user.alias, nombre: data.user.nombre }))
    } catch (error) {
      // TODO: controlar el error desde peticion
      console.log(error)
      dispatch(onLogout(error.response.data?.msg || ''))
      dispatch(onLogout('Error en el registro'))
    }
  }

  const checkToken = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      return dispatch(onLogout())
    }

    try {
      const { data } = await socialApi('/usuarios/renew')
      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime())
      dispatch(onLogin({ alias: data.nombre, id: data.id }))
    } catch (error) {
      localStorage.clear()
      dispatch(onLogout())
    }
  }

  const startLogout = () => {
    localStorage.clear()
    dispatch(onLogout())
  }

  return {
    // propiedades
    errorMessage,
    status,
    user,
    // metodos
    startLogin,
    startRegister,
    checkToken,
    startLogout
  }
}
