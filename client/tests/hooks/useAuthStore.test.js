import { configureStore } from '@reduxjs/toolkit'
import { act, renderHook, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'

import { socialApi } from '../../src/api'
import { useAuthStore } from '../../src/hooks/useAuthStore'
import { authSlice } from '../../src/store/auth/authSlice'
import { initialState, notauthenticatedState } from '../fixtures/auth-states'
import { testErrorUserCredentials, testUserCredentials } from '../fixtures/testUser'

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer
    },
    preloadedState: {
      auth: { ...initialState }
    }
  })
}

describe('tests useAuthStore', () => {
  beforeEach(() => localStorage.clear())

  test('should return default values', () => {
    const mockStore = getMockStore({ ...initialState })

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{ children }</Provider>
    })

    expect(result.current).toEqual({
      errorMessage: undefined,
      status: 'checking',
      user: {},
      startLogin: expect.any(Function),
      startRegister: expect.any(Function),
      checkToken: expect.any(Function),
      startLogout: expect.any(Function)
    })
  })

  test('should login correctly', async () => {
    // localStorage.clear()
    const mockStore = getMockStore({ ...notauthenticatedState })

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
    })

    await act(async () => {
      await result.current.startLogin({
        alias: 'test',
        password: 'Test2021*'
      })
    })

    const { errorMessage, status, user } = result.current
    // console.log('login:', { errorMessage, status, user })
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: {
        id: 2,
        alias: 'test',
        name: 'test prueba',
        photoProfile: null,
        friends: []
      }
    })

    expect(localStorage.getItem('token')).toEqual(expect.any(String))
    // console.log(result.current)
  })

  test('should not login correctly', async () => {
    // localStorage.clear()
    const errorUser = {
      alias: 'test_1',
      password: 'test2021*'
    }
    const mockStore = getMockStore({ ...notauthenticatedState })

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
    })

    await act(async () => {
      await result.current.startLogin(errorUser)
    })

    const { errorMessage, status, user } = result.current
    // console.log({ errorMessage, status, user })
    // console.log(localStorage.getItem('token')) // null

    expect(localStorage.getItem('token')).toBe(null)

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: 'Usuario con alias: test_1 no fue encontrado en el sistema.',
      status: 'not-authenticated',
      user: {}
    })

    // waitFor(
    //   () => expect(result.current.errorMessage).toBe(undefined)
    // )

    // console.log(result.current)
  })

  // test('should register new user', async () => {
  //  const newUser = {
  //     alias: 'new',
  //     name: 'new user',
  //     email: 'newuser@gmail.com',
  //     phone: '01213456789',
  //     password: 'New2021*'
  //   }
  //   const mockStore = getMockStore({ ...notauthenticatedState })
  //   const { result } = renderHook(() => useAuthStore(), {
  //     wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
  //   })

  //   const spy = jest.spyOn(socialApi, 'post').mockReturnValue({
  //     data: {
  //       user: {
  //         status: true,
  //         friends: [],
  //         favorites: [],
  //         id: 3,
  //         alias: 'test1',
  //         name: 'test1 prueba',
  //         email: 'test1@gmail.com',
  //         phone: '3135257856',
  //         password: '$2a$14$iPjoAQqn3ygNqX3Uu37ZxehkmXMFl/wrHKD5CYB/xTZZkEpK4L8Ea',
  //         bio: null,
  //         photoProfile: null
  //       },
  //       token: 'new token'
  //     }
  //   })

  //   await act(async () => {
  //     await result.current.startRegister(newUser)
  //   })

  //   const { errorMessage, status, user } = result.current
  //   console.log({ errorMessage, status, user })

  //   expect({ errorMessage, status, user }).toEqual({
  //     errorMessage: undefined,
  //     status: 'authenticated',
  //     user: {
  //       alias: 'test1',
  //       bio: null,
  //       email: 'test@gmail.com',
  //       favorites: [],
  //       friends: [],
  //       id: 2,
  //       name: 'test1 prueba',
  //       phone: '3135257856',
  //       photoProfile: null
  //     }
  //   })

  //   spy.mockRestore()
  // })

  // test('should fail register', async () => {
  //   const mockStore = getMockStore({ ...notauthenticatedState })
  //   const { result } = renderHook(() => useAuthStore(), {
  //     wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
  //   })

  //   await act(async () => {
  //     await result.current.startRegister(testErrorUserCredentials)
  //   })

  //   const { errorMessage, status, user } = result.current

  //   expect({ errorMessage, status, user }).toEqual({
  //     errorMessage: '',
  //     status: 'not-authenticated',
  //     user: {}
  //   })
  // })

  test('should fail when there is not token', async () => {
    const mockStore = getMockStore({ ...initialState })
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
    })

    // console.log('token', localStorage.getItem('token'))

    await act(async () => {
      await result.current.checkToken()
    })

    const { errorMessage, status, user } = result.current
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'not-authenticated',
      user: {}
    })
  })

  test('should authenticated user when there is token', async () => {
    const { data } = await socialApi.post('/user/login', {
      alias: 'test',
      password: 'Test2021*'
    })
    // console.log(data)
    localStorage.setItem('token', data.token)

    const mockStore = getMockStore({ ...initialState })
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
    })

    await act(async () => {
      await result.current.checkToken()
    })

    const { errorMessage, status, user } = result.current
    // console.log({ errorMessage, status, user })

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined, status: 'not-authenticated', user: {}
    })
  })
})
