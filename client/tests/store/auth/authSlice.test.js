import { authSlice, clearErrorMessage, onLogin, onLogout } from '../../../src/store/auth/authSlice'
import { authenticatedState, initialState } from '../../fixtures/auth-states'
import { testUserCredentials } from '../../fixtures/testUser'

describe('Test on authSlice', () => {
  test('should return default state', () => {
    expect(authSlice.getInitialState()).toEqual(initialState)
  })

  test('should must login', () => {
    const state = authSlice.reducer(initialState, onLogin(testUserCredentials))
    expect(state).toEqual({
      status: 'authenticated',
      user: testUserCredentials,
      errorMessage: undefined
    })
  })

  test('should must logout', () => {
    const state = authSlice.reducer(authenticatedState, onLogout())
    expect(state).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage: undefined
    })
  })

  test('should must logout with error credentials', () => {
    const errorMessage = 'Credentials are incorrect'
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage))
    expect(state).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage
    })
  })

  test('should clear error message', () => {
    const errorMessage = 'Credentials are incorrect'
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage))
    const newState = authSlice.reducer(state, clearErrorMessage)

    expect(newState.errorMessage).toBe(undefined)
  })
})
