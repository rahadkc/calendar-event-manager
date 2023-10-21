import useSWR from 'swr'
import { END_POINT } from '../../lib/endpoints'
import { useEffect } from 'react'
import { useAppDispatch } from '../../redux/hook'
import { setEvents } from '../../redux/reducers/events/eventsSlice'

export type UseFetchEventsProps = {
  date?: Date
}

const useFetchEvents = ({ date = new Date() }: UseFetchEventsProps) => {
  const dispatch = useAppDispatch()

  const url = END_POINT + `?date=${date}`

  const { data = [], error, isValidating, isLoading, mutate } = useSWR(url)

  useEffect(() => {
    dispatch(setEvents(data))
  }, [JSON.stringify(data)])

  return {
    events: data,
    eventsError: error,
    isEventsLoading: isLoading,
    isValidating,
    mutate,
  }
}

export default useFetchEvents
