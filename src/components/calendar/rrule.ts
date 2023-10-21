import { RRule, rrulestr } from 'rrule'
import { EventType } from '../../lib/types'

const frequencyMap: Record<string, number> = {
  daily: RRule.DAILY,
  weekly: RRule.WEEKLY,
  monthly: RRule.MONTHLY,
  yearly: RRule.YEARLY,
}

// Function to generate RRule string
export function generateRRuleString(event: EventType) {
  const { recurring, start, count, interval } = event
  if (recurring && recurring in frequencyMap) {
    const rule = new RRule({
      freq: frequencyMap[recurring],
      dtstart: new Date(start),
      interval: interval || 1,
      ...(count && { count }),
    })

    return rule.toString()
  }
  return ''
}

// Function to generate recurring events
export function generateRecurringEventsForEvent(event: EventType, startDate: Date, endDate: Date) {
  const generatedEvents: EventType[] = []
  const rruleString = generateRRuleString(event)

  const eventStartDate = startDate < event.start ? startDate : event.start
  const startOfWeekDate = new Date(eventStartDate)
  startOfWeekDate.setHours(0, 0, 0, 0)

  const endOfWeekDate = new Date(endDate)
  endOfWeekDate.setHours(23, 59, 59, 999)

  if (rruleString) {
    const rrule = rrulestr(rruleString)
    const generatedDates = rrule.between(startOfWeekDate, endOfWeekDate)

    generatedDates.forEach(date => {
      if (date >= startDate && date <= endOfWeekDate) {
        generatedEvents.push({
          ...event,
          start: date,
          end: date,
        })
      }
    })
  }

  return generatedEvents
}

// Main function to generate recurring events for an array of events
export function generateRecurringEvents({
  events,
  startDate,
  endDate,
}: {
  events: EventType[]
  startDate: Date
  endDate: Date
}) {
  const generatedEvents: EventType[] = []

  events.forEach(event => {
    if (event.recurring !== 'none') {
      const recurringEvents = generateRecurringEventsForEvent(event, startDate, endDate)

      generatedEvents.push(...recurringEvents)
    } else {
      generatedEvents.push({
        ...event,
        start: new Date(event.start),
        ...(event.end && { end: new Date(event.end) }),
      })
    }
  })

  return generatedEvents
}
