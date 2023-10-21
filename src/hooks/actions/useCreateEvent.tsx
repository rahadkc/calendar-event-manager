import useSWRMutation from 'swr/mutation'
import { END_POINT } from '../../lib/endpoints'
import { postRequest } from '../../http'

const useCreateEvent = () => {
  const { trigger, isMutating, error } = useSWRMutation({ url: END_POINT, options: {} }, postRequest)

  return {
    trigger,
    isMutating,
    error,
  }
}

export default useCreateEvent
