import { METHOD } from '../../lib/constants'
import useMutation from './useMutation'

const useDeleteEvent = () => {
  const { trigger, isMutating, error, revalidate } = useMutation({ method: METHOD.DELETE })

  return {
    trigger,
    isMutating,
    error,
    revalidate,
  }
}

export default useDeleteEvent
