import { render, screen } from '@testing-library/react'
import { useSelector } from 'react-redux'

import HeaderCard from '../../../../../src/components/home/layout/card/HeaderCard'
import { useHomeStore } from '../../../../../src/hooks/useHomeStore'

jest.mock('../../../../../src/hooks/useHomeStore')

jest.mock('react-redux', () => ({
  useSelector: jest.fn()
}))

describe('test component <HeaderCard />', () => {
  test('should render component', () => {
    useSelector.mockImplementation(() => ('hello world'))
    useHomeStore.mockReturnValue({
      makeAComment: jest.fn(),
      checkCommentsHook: jest.fn(),
      addToFavorites: jest.fn()
    })
    const { container } = render(<HeaderCard />)

    expect(container).toMatchSnapshot()
    expect(screen.getByText('Ver comentarios')).toBeTruthy()
    // screen.debug()
  })
})
