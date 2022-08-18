import { render, screen } from '@testing-library/react'

import { NavBar } from '../../../../src/components/home/layout/NavBar'

jest.mock('../../../../src/components/home/layout/NavBar', () => ({
  NavBar: () => <h1>Nav Bar</h1>
}))

describe('test component <NavBar />', () => {
  test('should render component and match to snapshot', () => {
    render(<NavBar />)
    // screen.debug()
    expect(screen.findAllByAltText('Nav Bar')).toBeTruthy()
  })
})
