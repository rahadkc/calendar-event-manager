import { ZodType, z } from 'zod'
import { RECURRING_TYPE } from '../../../lib/constants'

export type EventFormDataType = {
  title: string
  description: string
  note: string
  start: Date | string
  end?: Date | string
  allDay: boolean
  recurring: RECURRING_TYPE
  interval?: number | undefined
  count?: number | undefined
  _id?: string
  createdAt?: string
  updatedAt?: string
}

export const EventSchema: ZodType<EventFormDataType> = z
  .object({
    title: z.string().min(2, { message: 'Event title is required' }),
    description: z.string().max(50, { message: 'Maximum character 50' }),
    note: z.string().max(120, { message: 'Maximum character 120' }),
    allDay: z.boolean(),
    start: z.coerce.date(),
    end: z.coerce.date().or(z.string()).optional(),
    recurring: z.nativeEnum(RECURRING_TYPE),
    interval: z.coerce.number().max(12).optional(),
    count: z.coerce.number().optional(),
  })
  .superRefine(({ recurring, count, start, end, allDay }, ctx) => {
    if (recurring !== RECURRING_TYPE.NONE && !count) {
      ctx.addIssue({
        code: 'custom',
        message: 'Please specify how many time to repeat (min 1)',
        path: ['count'],
      })
    }
    if (allDay && (!start || !end)) {
      ctx.addIssue({
        code: 'custom',
        message: 'You have to select end date for all Day event',
        path: ['end'],
      })
    }

    if (start && end && start > end) {
      ctx.addIssue({
        code: 'custom',
        message: 'End time must be greater',
        path: ['end'],
      })
    }
  })

export type EventSchemaType = z.infer<typeof EventSchema>
