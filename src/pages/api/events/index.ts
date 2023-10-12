import dbConnect from '../../../../utils/mongoDbConnect'
import { getEvents, createEvent, deleteEvent } from 'backend/controllers/eventController'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      await getEvents(req, res)
      break
    case 'POST':
      await createEvent(req, res)
      break
    case 'DELETE':
      await deleteEvent(req, res)
      break
    case 'PUT':
      res.status(200).json({ msg: 'Thanks Updated!' })
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
