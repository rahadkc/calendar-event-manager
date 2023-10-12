import mongoose, { Schema, Document, Model } from 'mongoose'

mongoose.Promise = global.Promise

export interface IEvent extends Document {
  title: string
  start: Date
  end: Date
  description?: string
  timezone?: string
  start_date?: string
  end_date?: string
  start_time?: string
  end_time?: string
  background?: string
}

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: true,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    description: String,
    timezone: String,
    start_date: String,
    end_date: String,
    start_time: String,
    end_time: String,
    background: String,
  },
  { timestamps: true, _id: true }
)

export default mongoose.models.Event
  ? mongoose.model('Event')
  : (mongoose.model<IEvent>('Event', eventSchema) as Model<IEvent>)
