/** @jest-environment jsdom */
import React from 'react'
import CreateEventModal from '../createEventModal'
import { render } from '../../../../test-utils'

const handleClose = jest.fn()

describe('CreateEventModal', () => {
  it('renders without errors', () => {
    const { container } = render(<CreateEventModal open={true} handleClose={handleClose} />)
    expect(container).toBeInTheDocument()
  })
})
