/** @jest-environment jsdom */
import React from 'react'
import EditEventModal from '../editEventModal'
import { render } from '../../../../test-utils'

const mockEvent = {
  title: 'Event one',
  start: new Date(),
  end: new Date(),
  recurring: 'none',
}

const handleClose = jest.fn()

describe('EditEventModal', () => {
  it('renders without errors', () => {
    const { container } = render(
      <EditEventModal open={true} selectedEvent={mockEvent} handleClose={handleClose} isEdit={true} />
    )
    expect(container).toBeInTheDocument()
  })
})
