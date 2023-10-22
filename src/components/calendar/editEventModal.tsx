import React, { useCallback } from 'react'
import Modal from '../ui/modal'
import EventForm from '../form/events/eventForm'
import useUpdateEvent from '../../hooks/actions/useUpdateEvent'
import { dateToISOStringLocal } from '../../lib/date'
import { EventType } from '../../lib/types'
import { showToast } from '../../lib/toast'
import { revalidateLiveQueries } from '../../http/swrConfigProvider'

const EditEventModal = ({ handleClose, open, selectedEvent }: any) => {
  const { trigger } = useUpdateEvent()

  const event = {
    ...selectedEvent,
    start: dateToISOStringLocal(selectedEvent.start),
    end: dateToISOStringLocal(selectedEvent.end),
  }
  const handleEditEvent = useCallback(async (data: EventType) => {
    try {
      const response = await trigger({
        requestBody: data,
        queryParams: { id: selectedEvent._id },
      })
      if (response.status === 'success') {
        showToast({ type: 'success', message: 'Event updated successfully' })
        revalidateLiveQueries()
        handleClose()
      }

      if (response.error) {
        showToast({ type: 'error', message: 'Event updated successfully' })
        handleClose()
      }
    } catch (error) {
      showToast({ type: 'error', message: 'Event updated successfully' })
      console.error(error)
      handleClose()
    }
  }, [])

  return (
    <Modal open={open} onClose={handleClose} title={'Edit Event'} disableClickOutside>
      <div className="pb-9">
        <EventForm
          selectedEvent={event}
          handleSubmitForm={handleEditEvent}
          handleClose={handleClose}
          isEdit={true}
        />
      </div>
    </Modal>
  )
}

export default EditEventModal
