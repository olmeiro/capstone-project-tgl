import { onChecking } from './authSlice'

export const checkingAuth = (email, password) => {
  return async (dispatch) => {
    dispatch(onChecking())
  }
}
