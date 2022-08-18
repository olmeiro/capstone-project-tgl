import { render, screen } from '@testing-library/react'
import { HomeLayout } from '../../../../src/components/home/layout/HomeLayout'

jest.mock('../../../../src/components/home/layout/HomeLayout')

describe('Test component <HomeLayout />', () => {
  test('Component should be match with snapshot', () => {
    const { container } = render(<HomeLayout />)
    // screen.debug()
    expect(container).toMatchSnapshot()
  })
})
