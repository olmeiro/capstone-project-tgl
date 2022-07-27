import { useDispatch, useSelector } from 'react-redux'
import { socialApi } from '../api'
import { onChecking, onLogin, onLogout } from '../store'

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const startLogin = async ({ username, password }) => {
    console.log('here', { username, password })
    dispatch(onChecking())
    try {
      const result = await socialApi.post('/login', { username, password })
      console.log(result.data.data)
      dispatch(onLogin({ username: result.data.data.username, rol: result.data.data.roli }))
    } catch (error) {
      console.log(error)
      dispatch(onLogout('Credenciales incorrectass'))
    }
  }

  return {
    // propiedades
    errorMessage,
    status,
    user,
    // metodos
    startLogin
  }
}
