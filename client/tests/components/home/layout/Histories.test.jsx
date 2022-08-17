import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { Histories } from '../../../../src/components/home/layout/Histories'
import { useHomeStore } from '../../../../src/hooks/useHomeStore'
import { homeSlice } from '../../../../src/store'

const store = configureStore({
  reducer: {
    home: homeSlice.reducer
  }
  // preloadedState: {
  //   home: {

  //   }
  // }
})

jest.mock('../../../../src/hooks/useHomeStore')

describe('test component <Histories />', () => {
  test('should render component correctly', () => {
    useHomeStore.mockReturnValue({
      getPostsToHomeHook: jest.fn(),
      likeAPost: jest.fn(),
      getInfoFromTheUserLoggedIn: jest.fn(),
      getFavoritesHook: jest.fn()
    })
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Histories />
        </MemoryRouter>
      </Provider>
    )
    // screen.debug()
    expect(container).toMatchSnapshot()
  })
})
