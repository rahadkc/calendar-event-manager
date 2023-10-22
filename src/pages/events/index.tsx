import EventCalendar from '../../components/calendar'
import React, { useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { selectEventPage, selectEvents, setEventPage } from '../../redux/reducers/events/eventsSlice'
import { isString } from '../../lib/helpers'
import { generateRecurringEvents } from '../../components/calendar/rrule'
import useURLParams from '../../hooks/useURLParams'

const Events = () => {
  const dispatch = useAppDispatch()
  const events = useAppSelector(selectEvents)
  const eventDate = useAppSelector(selectEventPage)
  const { getParams } = useURLParams()
  const { start: startParam } = getParams(['start'], ['start'])

  const startDateParam = useMemo(() => {
    return new Date(startParam || new Date())
  }, [JSON.stringify(startParam)])

  const startDate = useMemo(() => {
    return isString(eventDate) ? new Date() : eventDate
  }, [eventDate])

  const endDate = useMemo(() => {
    const newStartDate = startDate || startDateParam
    const newDate = new Date(newStartDate)
    const endDate = new Date(newDate.setDate(newStartDate.getDate() + 6))
    return endDate
  }, [startDate, startDateParam])

  const calendarEvents = useMemo(() => {
    let calendarEvents
    if (events.length > 0) {
      calendarEvents = generateRecurringEvents({ events: events, startDate, endDate })
    }
    return calendarEvents
  }, [events, startDate])

  useEffect(() => {
    if (startDateParam) {
      dispatch(setEventPage(startDateParam))
    }
  }, [String(startDateParam)])

  return <EventCalendar events={calendarEvents} defaultDate={startDateParam} />
}

export default Events
