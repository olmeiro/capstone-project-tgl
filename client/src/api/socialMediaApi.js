import axios from 'axios'
import { getEnvVariables } from '../helpers/getEnvVariables'

const { VITE_URL_API } = getEnvVariables()

const socialApi = axios.create({
  baseURL: VITE_URL_API
})

// Interceptors
socialApi.interceptors.request.use(config => {
  config.headers = {
    ...config.headers,
    'x-token': localStorage.getItem('token')
  }

  return config
})

export default socialApi
