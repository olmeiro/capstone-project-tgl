import { render, screen } from '@testing-library/react'
import { useSelector } from 'react-redux'

import { Card } from '../../../../../src/components/home/layout/card/Card'
import { useHomeStore } from '../../../../../src/hooks/useHomeStore'

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
        <Card />
    )
    // screen.debug()
    expect(container).toMatchSnapshot()
  })
})
