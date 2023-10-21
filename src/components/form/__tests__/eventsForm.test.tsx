/** @jest-environment jsdom */
import { fireEvent, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { render } from '../../../../test-utils'
import EventForm from '../events/eventForm'

describe('EventForm', () => {
  const mockOnSubmit = jest.fn()
  const mockOnClose = jest.fn()

  it('renders without errors', () => {
    const { container } = render(<EventForm handleSubmitForm={mockOnSubmit} handleClose={mockOnClose} />)
    expect(container).toBeInTheDocument()
  })

  it('Calls on sumbmit function', async () => {
    const { container, getByRole } = render(
      <EventForm handleSubmitForm={mockOnSubmit} handleClose={mockOnClose} />
    )
    await act(async () => {
      const inputEl = container.querySelector('input[name="title"]')

      if (inputEl) {
        fireEvent.change(inputEl, { target: { value: 'Event title' } })
        fireEvent.click(
          getByRole('button', {
            name: /save/i,
          })
        )
      }
    })

    expect(mockOnSubmit).toHaveBeenCalledTimes(1)
  })

  it('should show Validation error without title', async () => {
    const { container, getByRole } = render(
      <EventForm handleSubmitForm={mockOnSubmit} handleClose={mockOnClose} />
    )
    await act(async () => {
      const titleElm = container.querySelector('input[name="title"]')
      const descriptionElm = container.querySelector('input[name="description"]')

      if (titleElm && descriptionElm) {
        fireEvent.change(descriptionElm, { target: { value: 'something' } })
        fireEvent.change(titleElm, { target: { value: '' } })
        fireEvent.click(
          getByRole('button', {
            name: /save/i,
          })
        )
      }
    })

    expect(screen.getByText('Event title is required')).toBeInTheDocument()
  })

  it('Edit: show delete button when edit form', async () => {
    const { container, getByRole } = render(
      <EventForm handleSubmitForm={mockOnSubmit} handleClose={mockOnClose} isEdit={true} />
    )
    const deleteBtn = getByRole('button', {
      name: /delete/i,
    })

    expect(deleteBtn).toBeInTheDocument()
  })
})
