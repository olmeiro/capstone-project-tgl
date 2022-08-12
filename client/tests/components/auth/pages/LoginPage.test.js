import { configureStore } from '@reduxjs/toolkit'
import { render, screen, tree } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { AuthLayout } from '../../../../src/components/auth/layout/AuthLayout'

import { LoginPage } from '../../../../src/components/auth/pages/LoginPage'
import { authSlice } from '../../../../src/store'

jest.mock('../../../../assets/logo_Team_International.png')

const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  },
  preloadedState: {}
}
)

describe('test on <LoginPage />', () => {
  test('should render component correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AuthLayout>
            <LoginPage />
          </AuthLayout>
        </MemoryRouter>
      </Provider>
    )
  })

  // screen.debug()
  // expect(tree()).toMatchSnapshot()
  // expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1)
})
