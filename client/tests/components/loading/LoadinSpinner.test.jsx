import { render, screen } from '@testing-library/react'

import LoadingSpinner from '../../../src/components/loading/LoadingSpinner'

describe('test on <LoadingSpinner />', () => {
  test('should match to Snapshot', () => {
    const { container } = render(<LoadingSpinner />)
    // screen.debug()

    expect(container).toMatchSnapshot()
  })
})
