import { render, screen } from '@testing-library/react'

import { FooterPage } from '../../../../src/components/home/layout/Footer'

describe('test component <FooterPage /> HomeLayour', () => {
  test('should render component', () => {
    render(<FooterPage/>)
    // screen.debug()
    expect(screen.findAllByAltText('Company')).toBeTruthy()
  })
})
