import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import { removeToken } from './storage'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'
import { setBlogs } from './reducers/blogReducer'
import { setLoggedUser } from './reducers/loginReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const [userData, setUserData] = useState({ username: '', password: '' })
  const blogFormRef = useRef()

  useEffect(() => {
    if (user) {
      dispatch(setBlogs())
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setLoggedUser(user))
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
                dispatch(setLoggedUser(null))
              }}
            >
              logout
            </button>
          </p>
          <Toggleable btnLabel="add blog" ref={blogFormRef}>
            <BlogForm blogFormRef={blogFormRef} />
          </Toggleable>

          {blogs.length &&
            blogs
              .map((blog) => <Blog key={blog.id} blog={blog} />)
              .sort((a, b) => b.likes - a.likes)}
        </>
      )}
    </div>
  )
}

export default App
