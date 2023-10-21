import EventCalendar from '../../components/calendar'
import React, { useMemo } from 'react'
import { useAppSelector } from '../../redux/hook'
import { selectEventPage, selectEvents } from '../../redux/reducers/events/eventsSlice'
import { isString } from '../../lib/helpers'
import { generateRecurringEvents } from '../../components/calendar/rrule'

const Events = () => {
  const events = useAppSelector(selectEvents)
  const eventDate = useAppSelector(selectEventPage)

  const startDate = useMemo(() => {
    return isString(eventDate) ? new Date() : eventDate
  }, [eventDate])

  const endDate = useMemo(() => {
    const newDate = new Date(startDate)
    const endDate = new Date(newDate.setDate(startDate.getDate() + 6))
    return endDate
  }, [startDate])

  const calendarEvents = useMemo(() => {
    let calendarEvents
    if (events.length > 0) {
      calendarEvents = generateRecurringEvents({ events: events, startDate, endDate })
    }
    return calendarEvents
  }, [events, startDate])

  return <EventCalendar events={calendarEvents} />
}

export default Events
