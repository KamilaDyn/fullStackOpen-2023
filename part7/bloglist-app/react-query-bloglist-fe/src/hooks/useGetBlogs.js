import { useQuery } from '@tanstack/react-query'
import { getAll } from '../services/blogs'
export const useGetBlogs = () => {
  const { status, data: blogs } = useQuery({
    queryKey: ['blogs'],
    queryFn: getAll,
    retry: 1,
  })

  return { status, blogs }
}
