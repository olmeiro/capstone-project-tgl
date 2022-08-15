export const getEnvVariables = () => {
  // import.meta.env

  return {
    // ...import.meta.env
    VITE_MODE: import.meta.env.VITE_MODE,
    VITE_URL_API: import.meta.env.VITE_URL_API,
    VITE_API_KEY: import.meta.env.VITE_API_KEY
  }
}
