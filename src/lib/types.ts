export type RecurringType = 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly'

export type EventType = {
  title: string
  start: Date
  end?: Date
  allDay?: boolean
  description?: string
  note?: string
  recurring: RecurringType
  count?: number
  interval?: number
  _id?: string
  createdAt?: string
  updatedAt?: string
}

export type KeyValueObjectType = { [key: string]: string } | { [key: string]: any }
