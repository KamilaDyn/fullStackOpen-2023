import { useEffect, useRef } from 'react'
import { Blog, BlogForm, Toggleable } from '../components'

import { useUserDispatch, useUserValue } from '../context/UserContext'
import { useQuery } from '@tanstack/react-query'
import { getAll } from '../services/blogs'
const Home = () => {
  const user = useUserValue()
  const dispatch = useUserDispatch()
  const blogFormRef = useRef()

  const { status, data: blogs } = useQuery({
    queryKey: ['blogs'],
    queryFn: getAll,
    retry: 1,
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const userJson = JSON.parse(loggedUserJSON)
      dispatch({ type: 'LOGGED_USER', payload: userJson })
    }
  }, [])

  if (!user) {
    return null
  }
  return (
    <div>
      <>
        <Toggleable btnLabel="add blog" ref={blogFormRef}>
          <BlogForm blogFormRef={blogFormRef} />
        </Toggleable>
        {status === 'loading' ? (
          <p>loading </p>
        ) : blogs && blogs.length > 0 ? (
          blogs
            .map((blog) => <Blog key={blog.id} blog={blog} />)
            .sort((a, b) => b.likes - a.likes)
        ) : (
          <p>no blogs</p>
        )}
      </>
    </div>
  )
}

export default Home
