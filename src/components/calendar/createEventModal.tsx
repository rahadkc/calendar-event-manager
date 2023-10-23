import Modal from '../ui/modal'
import { selectEvent } from '../../redux/reducers/events/eventsSlice'
import { showToast } from '../../lib/toast'
import { useAppSelector } from '../../redux/hook'
import useCreateEvent from '../../hooks/actions/useCreateEvent'
import { revalidateLiveQueries } from '../../http/swrConfigProvider'
import EventForm from '../form/events/eventForm'
import { useCallback } from 'react'

const CreateEventModal = ({ handleClose, open }: any) => {
  const { trigger: createEvent, isMutating } = useCreateEvent()
  const event = useAppSelector(selectEvent)

  const startTimeAndDate = event.start

  const handleCreateEvent = useCallback(async (data: any) => {
    const { title, start, end } = data

    if (!title) {
      return
    }

    try {
      const schema = {
        ...data,
        start,
        end: end || start,
      }

      const response = await createEvent(schema)

      if (response.status === 'success') {
        revalidateLiveQueries()
        showToast({ type: 'success', message: 'Event created successfully' })
        handleClose()
      }
      if (response.error) {
        showToast({ type: 'error', message: 'Event Creation Failed' })
        handleClose()
      }
    } catch (error) {
      handleClose()
      console.error(error)
    }
  }, [])

  return (
    <Modal open={open} onClose={handleClose} title={'Add Event'} disableClickOutside>
      <div className="mb-10">
        <EventForm
          defaultTime={startTimeAndDate}
          handleSubmitForm={handleCreateEvent}
          handleClose={handleClose}
          isMutating={isMutating}
        />
      </div>
    </Modal>
  )
}

export default CreateEventModal
