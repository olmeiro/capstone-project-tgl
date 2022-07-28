import axios from 'axios'
import { getEnvVariables } from '../helpers/getEnvVariables'

const { VITE_URL_API } = getEnvVariables()
console.log('VITE_URL_API', VITE_URL_API)

const socialApi = axios.create({
  baseURL: VITE_URL_API
})

// Todo: interceptors
socialApi.interceptors.request.use(config => {
  config.headers = {
    ...config.headers,
    'x-token': localStorage.getItem('token')
  }

  return config
})

export default socialApi
