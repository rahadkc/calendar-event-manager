import { END_POINT } from '../../lib/endpoints'
import useSWRMutation from 'swr/mutation'
import { mutateRequest } from '../../http'
import { METHOD } from '../../lib/constants'
import { useSWRConfig } from 'swr'

export type UseMutationProps = {
  method?: METHOD
}

const useMutation = ({ method = METHOD.POST }: UseMutationProps) => {
  const { mutate } = useSWRConfig()
  const options = { method }
  const { trigger, isMutating, error } = useSWRMutation({ url: END_POINT, options }, mutateRequest)

  return {
    trigger,
    isMutating,
    error,
    revalidate: mutate,
  }
}

export default useMutation
