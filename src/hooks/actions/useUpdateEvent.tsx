import { METHOD } from '../../lib/constants'
import useMutation from './useMutation'

const useUpdateEvent = () => {
  const { trigger, isMutating, error, revalidate } = useMutation({ method: METHOD.PUT })

  return {
    trigger,
    isMutating,
    error,
    revalidate,
  }
}

export default useUpdateEvent
