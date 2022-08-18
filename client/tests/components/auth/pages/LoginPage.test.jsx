import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import { LoginPage } from '../../../../src/components/auth/pages/LoginPage'
import { useAuthStore } from '../../../../src/hooks/useAuthStore'
import { authSlice } from '../../../../src/store'
import { notauthenticatedState } from '../../../fixtures/auth-states'

jest.mock('../../../../assets/logo_Team_International.png')

const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  },
  preloadedState: {
    auth: notauthenticatedState
  }
})

jest.mock('../../../../src/hooks/useAuthStore')

describe('test on <LoginPage />', () => {
  test('should match to Snapshot', () => {
    useAuthStore.mockReturnValue({
      startLogin: jest.fn()
    })
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    )

    expect(container).toMatchSnapshot()
  })

  test('should show text Crear cuenta inside Link', () => {
    useAuthStore.mockReturnValue({
      startLogin: jest.fn()
    })
    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    )

    expect(getByTestId('create-count')).toBeTruthy()
    expect(getByTestId('create-count').innerHTML).toBe('Crear cuenta')
    expect(getByTestId('create-count').innerHTML).toContain('Crear cuenta')
  })

  test('should show text Login button', () => {
    useAuthStore.mockReturnValue({
      startLogin: jest.fn()
    })
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    )

    const button = container.querySelector('button')
    expect(button.innerHTML).toBe('Login')
    expect(button.innerHTML).toContain('Login')
  })

  test('should login button works aria-label', () => {
    useAuthStore.mockReturnValue({
      startLogin: jest.fn()
    })

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    )

    fireEvent.click(screen.getByRole('button', { name: 'btn-login' }))
    expect(screen.getByTestId('btn-login')).toBeTruthy()
  })

  test('should render component correctly', () => {
    useAuthStore.mockReturnValue({
      startLogin: jest.fn()
    })

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    )
    expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1)
  })

  test('should call startLogin function when click login button', () => {
    useAuthStore.mockReturnValue({
      startLogin: jest.fn()
    })

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    )

    const loginBtn = screen.getByLabelText('btn-login')
    fireEvent.click(loginBtn)
    expect(useAuthStore).toHaveBeenCalled()
  })

  test('should call form submit function ', () => {
    useAuthStore.mockReturnValue({
      startLogin: jest.fn()
    })

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    )

    const inputAliasValue = 'Olme'
    const inputPwValue = 'Olme2021*'

    const inputAlias = screen.getByTestId('data-alias')
    const inputPw = screen.getByTestId('data-pw')
    const form = screen.getByRole('form')

    fireEvent.input(inputAlias, { target: { value: inputAliasValue } })
    fireEvent.input(inputPw, { target: { value: inputPwValue } })

    fireEvent.submit(form)
    expect(useAuthStore).toHaveBeenCalled()
  })
})
