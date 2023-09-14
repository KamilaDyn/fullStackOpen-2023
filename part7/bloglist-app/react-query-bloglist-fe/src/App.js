import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import { removeToken } from './storage'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'
import { useUserDispatch, useUserValue } from './context/UserContext'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getAll } from './services/blogs'

const App = () => {
  const user = useUserValue()
  const dispatch = useUserDispatch()
  const queryClient = useQueryClient()
  const [userData, setUserData] = useState({ username: '', password: '' })
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

  return (
    <div>
      {!user ? (
        <>
          <h2> Log in to application</h2>
          <div>Example login data: Kami01 test123</div>
          <Notification />
          <LoginForm userData={userData} setUserData={setUserData} />
        </>
      ) : (
        <>
          <h2>blogs</h2>
          <Notification />
          <p>
            User {user.username} is logged in. You can{' '}
            <button
              onClick={() => {
                removeToken()
                dispatch({ type: 'LOG_OUT' })
              }}
            >
              logout
            </button>
          </p>
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
      )}
    </div>
  )
}

export default App
