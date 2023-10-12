//@ts-nocheck
import { NextApiRequest, NextApiResponse } from 'next'
import EventModel, { IEvent } from '../models/eventModel'
import mongoose from 'mongoose'

export const getEvents = async (req: NextApiRequest, res: NextApiResponse) => {
  //   const { searchParams } = new URL(req.url) // Replace 'http://example.com' with the actual base URL.
  //   const page = searchParams.get('page') || '1'
  const page = (req.query.page as string) || '1'

  try {
    const events: IEvent[] = await getPaginatedEvents(req)
    const eventsJSON = events.map(event => event.toJSON())
    console.log('{events, res}', { events: eventsJSON, res })

    res.status(200).json(eventsJSON)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getEvent = async (req: NextApiRequest, res: NextApiResponse) => {
  //   const { searchParams } = new URL(req.url) // Replace 'http://example.com' with the actual base URL.
  //   const eventId = searchParams.get('id')
  const eventId = req.query.id as string

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    res.status(404).json({ error: 'No such Event' })
    return
  }

  try {
    const event: IEvent | null = await EventModel.findById(eventId)
    if (!event) {
      res.status(404).json({ error: 'No such Event' })
      return
    }
    res.status(200).json(event.toJSON())
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const createEvent = async (req: NextApiRequest, res: NextApiResponse) => {
  const eventData: IEvent = req.body as IEvent

  const emptyFields: string[] = []

  if (!eventData.title) {
    emptyFields.push('title')
  }

  if (emptyFields.length > 0) {
    res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    return
  }

  console.log('eventData', { eventData })

  try {
    const newEvent: IEvent = await EventModel.create(eventData)
    res.status(200).json({ result: newEvent.toJSON() })
  } catch (error) {
    console.log('ERROR DATABASE operation')

    res.status(400).json({ error: error.message })
  }
}

export const deleteEvent = async (req: NextApiRequest, res: NextApiResponse) => {
  //   const { searchParams } = new URL(req.url) // Replace 'http://example.com' with the actual base URL.
  //   const eventId = searchParams.get('id')
  const eventId = req.query.id as string

  console.log('DELETE::', eventId)
  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    res.status(400).json({ error: 'Something is wrong' })
    return
  }

  try {
    const deletedEvent: IEvent | null = await EventModel.findByIdAndDelete(eventId)
    if (!deletedEvent) {
      res.status(400).json({ error: 'No such Event' })
      return
    }
    res.status(200).json(deletedEvent.toJSON())
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const updateEvent = async (req: NextApiRequest, res: NextApiResponse) => {
  //   const { searchParams } = new URL(req.url) // Replace 'http://example.com' with the actual base URL.
  //   const eventId = searchParams.get('id') as string
  const eventId = req.query.id as string

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    res.status(400).json({ error: 'No such Event' })
    return
  }

  const eventData: IEvent = req.body as IEvent

  try {
    const updatedEvent: IEvent | null = await EventModel.findByIdAndUpdate(eventId, eventData, {
      new: true,
    })
    if (!updatedEvent) {
      res.status(400).json({ error: 'No such Event' })
      return
    }
    res.status(200).json(updatedEvent.toJSON())
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getPaginatedEvents = async (req: NextApiRequest, res: NextApiResponse) => {
  //   const { searchParams } = new URL(req.url) // Replace 'http://example.com' with the actual base URL.
  //   const page = searchParams.get('page') || '1'
  const page = req.query.page as string
  const userProvidedDate = req.query.date as string

  //   const userProvidedDate = searchParams.get('date')

  try {
    const today = userProvidedDate ? new Date(userProvidedDate) : new Date()

    // Calculate the date range for the current month
    const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    const lastDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)

    // Construct a filter object for the current month
    const filterCurrentMonth: { start: { $gte: Date; $lte: Date } } = {
      start: { $gte: firstDayOfCurrentMonth, $lte: lastDayOfCurrentMonth },
    }

    // Query the database for events in the current month
    const eventsCurrentMonth: IEvent[] = await EventModel.find(filterCurrentMonth)

    res.status(200).json(eventsCurrentMonth.map(event => event.toJSON()))
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
