
export const initialState = {
  status: 'checking',
  user: {},
  errorMessage: undefined
}

export const authenticatedState = {
  status: 'authenticated',
  user: {
    id: 'abc',
    name: 'John Doe'
  },
  errorMessage: undefined
}

export const notauthenticatedState = {
  status: 'not-authenticated',
  user: {},
  errorMessage: undefined
}
