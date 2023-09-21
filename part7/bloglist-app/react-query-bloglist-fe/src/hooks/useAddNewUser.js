import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotification } from '../context/NotificationContext'
import { addNewUser } from '../services/users'
import { useNavigate } from 'react-router-dom'

export const useAddNewUser = () => {
  const queryClient = useQueryClient()
  const setNotification = useNotification()
  const navigate = useNavigate()
  const newUserMutation = useMutation(addNewUser, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      setNotification(
        {
          type: 'notification',
          text: 'New user added',
        },
        5,
      )
      navigate('/login')
    },
    onError: (error) => {
      setNotification(
        {
          type: 'error',
          text:
            error && error.response && error.response.data
              ? error.response.data.error
              : 'could not add user, please try later',
        },
        5,
      )
    },
  })

  return newUserMutation
}
