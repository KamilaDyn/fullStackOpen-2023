import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createComment } from '../services/comments'
import { useNotification } from '../context/NotificationContext'

export const useAddComment = () => {
  const queryClient = useQueryClient()
  const setNotification = useNotification()

  const newCommentMutation = useMutation(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] })
      setNotification(
        {
          type: 'notification',
          text: 'New comment added',
        },
        5,
      )
    },
    onError: () => {
      setNotification(
        {
          type: 'error',
          text: 'could not comment, please try later',
        },
        5,
      )
    },
  })

  return newCommentMutation
}
