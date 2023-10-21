/** @jest-environment jsdom */
import { RECURRING_TYPE } from '../../../lib/constants'
import { generateRRuleString, generateRecurringEvents, generateRecurringEventsForEvent } from '../rrule'
import '@testing-library/jest-dom'

describe('generateRRuleString', () => {
  it('should generate RRule string for daily recurrence', () => {
    const event = {
      title: 'Event title',
      start: new Date('2023-10-01T12:00:00.000Z'),
      recurring: RECURRING_TYPE.DAYILY,
    }

    const rruleString = generateRRuleString(event)

    expect(rruleString).toMatch(/RRULE:FREQ=DAILY;/)
  })

  it('should return an empty string for non-recurring events', () => {
    const event = {
      title: 'Event title',
      start: new Date('2023-10-01T12:00:00.000Z'),
      recurring: RECURRING_TYPE.NONE,
    }

    const rruleString = generateRRuleString(event)

    expect(rruleString).toBe('')
  })
})

describe('generateRecurringEventsForEvent', () => {
  it('should generate recurring events for a given event', () => {
    const event = {
      title: 'Event title',
      recurring: RECURRING_TYPE.DAYILY,
      start: new Date('2023-10-01T12:00:00.000Z'),
    }
    const startDate = new Date('2023-10-01T01:00:00.000Z')
    const endDate = new Date('2023-10-03T02:59:59.000Z')

    const recurringEvents = generateRecurringEventsForEvent(event, startDate, endDate)

    expect(recurringEvents).toHaveLength(3)
  })

  it('should handle non-recurring events', () => {
    const events = [
      {
        title: 'Event title',
        recurring: RECURRING_TYPE.NONE,
        start: new Date('2023-10-01T12:00:00.000Z'),
      },
    ]
    const startDate = new Date('2023-10-01T12:00:00.000Z')
    const endDate = new Date('2023-10-01T13:59:59.999Z')

    const recurringEvents = generateRecurringEvents({ events, startDate, endDate })

    expect(recurringEvents).toHaveLength(1)
  })
})

describe('generateRecurringEvents', () => {
  it('should generate recurring events for an array of events', () => {
    const events = [
      {
        title: 'Event one',
        recurring: RECURRING_TYPE.DAYILY,
        start: new Date('2023-10-01T12:00:00.000Z'),
      },
      {
        title: 'Event two',
        recurring: RECURRING_TYPE.WEEKLY,
        start: new Date('2023-10-01T12:00:00.000Z'),
      },
    ]
    const startDate = new Date('2023-10-01T00:00:00.000Z')
    const endDate = new Date('2023-10-07T23:59:59.999Z')

    const generatedEvents = generateRecurringEvents({ events, startDate, endDate })

    expect(generatedEvents).toHaveLength(10)
  })

  it('should handle non-recurring events in the array', () => {
    const events = [
      {
        title: 'Event one',
        recurring: RECURRING_TYPE.DAYILY,
        start: new Date('2023-10-01T12:00:00.000Z'),
      },
      {
        title: 'Event two',
        recurring: RECURRING_TYPE.NONE,
        start: new Date('2023-10-01T12:00:00.000Z'),
      },
    ]
    const startDate = new Date('2023-10-01T00:00:00.000Z')
    const endDate = new Date('2023-10-02T23:59:59.999Z')

    const generatedEvents = generateRecurringEvents({ events, startDate, endDate })

    expect(generatedEvents).toHaveLength(4)
  })
})
