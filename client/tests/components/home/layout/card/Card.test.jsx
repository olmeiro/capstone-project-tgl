import { Card } from '../../../../../src/components/home/layout/card/Card'
import { render, screen } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider, useSelector } from 'react-redux'
import { homeSlice } from '../../../../../src/store'
import { useHomeStore } from '../../../../../src/hooks/useHomeStore'

const store = configureStore({
  reducer: {
    home: homeSlice.reducer
  }
})

jest.mock('../../../../../src/hooks/useHomeStore')
jest.mock('../../../../../src/components/home/layout/card/Card')

jest.mock('react-redux', () => ({
  useSelector: jest.fn()
}))

describe('tests component <Card />', () => {
  test('should render component', () => {
    useSelector.mockImplementation(() => ('hello world'))
    useHomeStore.mockReturnValue({
      useDispatch: jest.fn()
    })

    const { container } = render(
      // <Provider store={store}>
        <Card />
      // </Provider>
    )
    screen.debug()
    expect(container).toMatchSnapshot()
  })
})
