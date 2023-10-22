import React, { useCallback, useState } from 'react'
import { Calendar, NavigateAction, View, Views, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import CreateEventModal from './createEventModal'
import { format, parse, startOfWeek, getDay, enUS } from '../../lib/date'
import { useAppDispatch } from '../../redux/hook'
import { setEventData, setEventPage } from '../../redux/reducers/events/eventsSlice'
import EditEventModal from './editEventModal'
import useFetchEvents from '../../hooks/actions/useFetchEvents'
import CustomToolbar from './customToolbar'
import BooleanWrapper from '../booleanWrapper'
import { customDayPropGetter, setEventCellStyling } from './styles/calendar'

const DragAndDropCalendar = withDragAndDrop(Calendar)
const locales = {
  'en-US': enUS,
}

let currentDate = new Date()

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(currentDate, { weekStartsOn: getDay(currentDate) }),
  getDay,
  locales,
})

const EventCalendar = ({ events = [], height, style, ...calendarProps }: any) => {
  const calendarRef = React.createRef()
  const dispatch = useAppDispatch()
  const [openModal, setOpenModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState({})
  const [nextWeekDate, setNextWeekDate] = useState<Date>(new Date())

  useFetchEvents({ date: nextWeekDate })

  const formats = {
    weekdayFormat: 'EEE',
    timeGutterFormat: 'hh a',
  }

  const handleSlotSelect = useCallback(({ start, end }: { start: Date; end: Date }) => {
    const currentDate = new Date()

    if (start < currentDate) {
      return null
    }
    if (start > end) return

    dispatch(setEventData({ start, end }))
    handleOpenModal()
  }, [])

  const handleOpenModal = () => {
    setOpenModal(true)
  }
  const handleEventSelect = useCallback((event: any) => {
    setIsEdit(true)
    setSelectedEvent(event)
    handleOpenModal()
  }, [])

  const handleModalClose = useCallback(() => {
    setOpenModal(false)
    setIsEdit(false)
  }, [])

  const handleNavigate = useCallback((date: Date, view: View, action: NavigateAction) => {
    if (view === 'agenda' || view === 'day') {
      return // Disable navigation
    }
    setNextWeekDate(date)
    dispatch(setEventPage(date))
  }, [])

  return (
    <>
      <DragAndDropCalendar
        ref={calendarRef}
        localizer={localizer}
        formats={formats}
        popup={true}
        events={events}
        selectable
        resizable={false}
        longPressThreshold={1}
        eventPropGetter={setEventCellStyling}
        dayPropGetter={customDayPropGetter}
        onSelectSlot={handleSlotSelect}
        onSelectEvent={handleEventSelect}
        onNavigate={handleNavigate}
        defaultView={Views.WEEK}
        views={{ month: false, week: true, day: true, agenda: true }}
        step={30}
        scrollToTime={currentDate.getHours()}
        style={{ height: height ? height : 'calc(100vh - 20px)', ...style }}
        components={{ toolbar: CustomToolbar }}
        {...calendarProps}
      />

      <BooleanWrapper shouldRender={isEdit && openModal}>
        <EditEventModal open={openModal} handleClose={handleModalClose} selectedEvent={selectedEvent} />
      </BooleanWrapper>
      <BooleanWrapper shouldRender={!isEdit && openModal}>
        <CreateEventModal open={openModal} handleClose={handleModalClose} />
      </BooleanWrapper>
    </>
  )
}

export default EventCalendar
