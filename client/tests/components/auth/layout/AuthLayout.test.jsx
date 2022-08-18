import { render, screen } from '@testing-library/react'
import { AuthLayout } from '../../../../src/components/auth/layout/AuthLayout'

jest.mock('../../../../assets/logo_Team_International.png')

describe('test component <AuthLayout />', () => {
  test('should render and match to Snapshot', () => {
    const { container } = render(<AuthLayout />)
    // screen.debug()
    expect(container).toMatchSnapshot()
  })

  test('should render image', () => {
    render(<AuthLayout />)
    // screen.debug()
    const testImg = screen.getAllByRole('img')
    // console.log(testImg);
    expect(testImg[0].alt).toContain('logo team')
    expect(testImg[1].alt).toContain('logo team')
  })

  test('should image have src correctly', () => {
    const imagePath = 'http://localhost/'
    render(<AuthLayout />)

    const testImg = screen.getAllByRole('img')
    expect(testImg[0].src).toContain(imagePath)
  })
})
