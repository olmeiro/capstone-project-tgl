import { render, screen } from '@testing-library/react'
import * as reactRedux from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { useAuthStore } from '../../src/hooks/useAuthStore'
import { AppRouter } from '../../src/routes/AppRouter'

jest.mock('../../src/hooks/useAuthStore')
jest.mock('../../src/hooks/useHomeStore')
jest.mock('../../src/components/home/pages/HomePage', () => ({
  HomePage: () => <h1>Home Page</h1>
}))

describe('Test <AppRouter/>', () => {
  const mockCheckAuthToken = jest.fn()
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should render Loading component and call checkToken', () => {
    useAuthStore.mockReturnValue({

      status: 'checking',
      checkToken: mockCheckAuthToken
    })

    render(
        <AppRouter />
    )
    // screen.debug()
    expect(screen.findAllByText('spinner-container')).toBeTruthy()
    expect(mockCheckAuthToken).toHaveBeenCalled()
  })

  test('should render component LoginPage when not-authenticated', () => {
    useAuthStore.mockReturnValue({
      errorMessage: undefined,
      status: 'not-authenticated',
      user: {},
      checkToken: jest.fn()
    })

    const { container } = render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    )
    const loginBtn = screen.getByLabelText('btn-login')

    expect(loginBtn).toBeTruthy()
    expect(container).toMatchSnapshot()
  })

  test('should render component HomePage when authenticated', () => {
    useAuthStore.mockReturnValue({
      errorMessage: undefined,
      status: 'authenticated',
      checkToken: mockCheckAuthToken
    })

    render(
        <MemoryRouter >
          <AppRouter />
        </MemoryRouter>
    )
    // screen.debug()
    expect(screen.getByText('Home Page')).toBeTruthy()
  })
})
