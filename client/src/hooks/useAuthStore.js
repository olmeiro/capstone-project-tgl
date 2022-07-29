import { useDispatch, useSelector } from 'react-redux'
import { socialApi } from '../api'
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store'

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const startLogin = async ({ alias, password }) => {
    dispatch(onChecking())
    try {
      const { data } = await socialApi.post('/user/login', { alias, password })
      localStorage.setItem('token', data.body.token)
      localStorage.setItem('token-init-data', new Date().getTime())
      dispatch(onLogin({ alias: data.body.user.alias, name: data.body.user.name }))
    } catch (error) {
      dispatch(onLogout(error.response.data?.message || ''))
      setTimeout(() => {
        dispatch(clearErrorMessage())
      })
    }
  }

  const startRegister = async ({ alias, name, email, phone, password }) => {
    dispatch(onChecking())
    try {
      const { data } = await socialApi.post('/user', { alias, name, email, phone, password })
      localStorage.setItem('token', data.body.token)
      localStorage.setItem('token-init', new Date().getTime())
      dispatch(onLogin({ alias: data.body.alias, name: data.body.name }))
    } catch (error) {
      dispatch(onLogout(error.response.data?.message || ''))
      setTimeout(() => {
        dispatch(clearErrorMessage())
      })
    }
  }

  const checkToken = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      return dispatch(onLogout())
    }

    try {
      const { data } = await socialApi('/user/renew')
      localStorage.setItem('token', data.body.token)
      localStorage.setItem('token-init-date', new Date().getTime())
      dispatch(onLogin({ alias: data.name, id: data.id }))
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
    // properties
    errorMessage,
    status,
    user,
    // methods
    startLogin,
    startRegister,
    checkToken,
    startLogout
  }
}
