import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateBlog, deleteBlog } from '../services/blogs'
import { useNotification } from '../context/NotificationContext'
import { useNavigate } from 'react-router-dom'
export const useUpdateBlog = () => {
  const setNotification = useNotification()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const updateBlogLike = useMutation(updateBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })
  const deleteBlogMutation = useMutation(deleteBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      navigate('/')
      setNotification({ type: 'notification', text: 'Blog was deleted' }, 5)
    },
    onError: () => {
      setNotification(
        { type: 'error', text: 'Could not delete blog, please try later' },
        5,
      )
    },
  })
  return { updateBlogLike, deleteBlogMutation }
}
