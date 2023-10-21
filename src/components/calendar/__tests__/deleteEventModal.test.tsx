/** @jest-environment jsdom */
import React from 'react'
import { render } from '../../../../test-utils'
import DeleteEventModal from '../deleteEventModal'

const mockEvent = {
  _id: '1',
  title: 'Event one',
  start: new Date(),
  end: new Date(),
  recurring: 'none',
}

const handleClose = jest.fn()
const handleEditModalClose = jest.fn()

describe('DeleteEventModal', () => {
  it('renders without errors', () => {
    const { container } = render(
      <DeleteEventModal
        open={true}
        eventId={mockEvent._id}
        handleClose={handleClose}
        handleEditModalClose={handleEditModalClose}
      />
    )
    expect(container).toBeInTheDocument()
  })
})
