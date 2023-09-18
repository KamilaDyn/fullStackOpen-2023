import { useQuery } from '@tanstack/react-query'
import { getAllUsers } from '../services/users'

export const useGetUsers = () => {
  const { status, data: users } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
    retry: 1,
  })
  return { status, users }
}
