import React from 'react'
import Modal from '../ui/modal'
import { showToast } from '../../lib/toast'
import Button, { ButtonVariant } from '../ui/button'
import useDeleteEvent from '../../hooks/actions/useDeleteEvent'
import { revalidateLiveQueries } from '../../http/swrConfigProvider'

type DeleteModalType = {
  handleClose: () => void
  handleEditModalClose: () => void
  open: boolean
  eventId: string
}

const DeleteEventModal = ({ handleClose, handleEditModalClose, open, eventId }: DeleteModalType) => {
  const { trigger, isMutating, error } = useDeleteEvent()

  const handleDeleteEvent = async () => {
    try {
      const response = await trigger({
        requestBody: {},
        queryParams: { id: eventId },
      })

      if (response.status === 'success') {
        showToast({ type: 'success', message: 'Event deleted successfully' })
        revalidateLiveQueries()
        handleClose()
        handleEditModalClose()
      }

      if (response.error) {
        showToast({ type: 'error', message: 'Delete Failed' })
        handleClose()
      }
    } catch (error) {
      showToast({ type: 'error', message: 'Delete Failed' })

      console.error(error)
      handleClose()
    }
  }

  return (
    <Modal open={open} onClose={handleClose} disableClickOutside>
      <div>
        <div className="items-center text-center p-5">
          <Button onClick={handleClose} customClass="rounded-full closeBtn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
          <h2 className="text-lg font-bold">Do you really want to delete this event?</h2>
          <div className="mt-4">
            <Button onClick={handleDeleteEvent} variant={ButtonVariant.ERROR} isLoading={isMutating}>
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteEventModal
