import { useQuery } from '@tanstack/react-query'
import { getComments } from '../services/comments'
import { useParams } from 'react-router-dom'
export const useGetComments = () => {
  const { id } = useParams()

  const { status, data: comments } = useQuery({
    queryKey: ['comments'],
    queryFn: () => getComments(id),
    retry: 1,
  })

  return { status, comments }
}
