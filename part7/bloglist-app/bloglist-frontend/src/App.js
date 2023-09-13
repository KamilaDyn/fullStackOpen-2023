import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Blog from './components/Blog'
import { getAll } from './services/blogs'
import { login } from './services/login'
import { removeToken, setToken } from './storage'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'
import { createBlog, updateBlog, deleteBlog } from './services/blogs'
import { setNotification } from './reducers/notificationReducers'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userData, setUserData] = useState({ username: '', password: '' })
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const handleChange = ({ target }) => {
    const { name, value } = target
    setUserData((prevData) => ({ ...prevData, [name]: value }))
  }
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await login(userData)
      setToken(user)
      setUser(user)
      setUserData({ username: '', password: '' })
    } catch (exception) {
      dispatch(
        setNotification(
          { type: 'error', text: 'Wrong username or password' },
          5,
        ),
      )
      setTimeout(() => {
        setNotification(null)
      }, 5)
    }
  }

  const getAllBlogs = async () => {
    const blogs = await getAll()
    setBlogs(blogs)
  }

  useEffect(() => {
    getAllBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const addBlog = async (blogObject) => {
    try {
      const newBlog = await createBlog(blogObject)
      blogFormRef.current.toggleVisibility()
      dispatch(
        setNotification(
          {
            type: 'notification',
            text: `Success, a new blog ${newBlog.title} by ${newBlog.author} added.`,
          },
          5,
        ),
      )
      await getAllBlogs()
    } catch (err) {
      dispatch(
        setNotification(
          {
            type: 'error',
            text: 'there was error occur',
          },
          5,
        ),
      )
    }
  }

  const handleLikeChange = async (blogObj) => {
    const likedBlog = await updateBlog(blogObj.id, {
      title: blogObj.title,
      author: blogObj.author,
      url: blogObj.url,
      likes: blogObj.likes + 1,
    })
    setBlogs((prevData) =>
      prevData.map((blog) =>
        blog.id === likedBlog.id ? { ...blog, likes: likedBlog.likes } : blog,
      ),
    )
  }
  const handleBlogDelete = async (blog) => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      await deleteBlog(blog.id)
      setBlogs((currentBlogs) =>
        currentBlogs.filter((currentBlog) => currentBlog.id !== blog.id),
      )
      dispatch(
        setNotification(
          {
            type: 'notification',
            text: `Success, a blog ${blog.title} was removed.`,
          },
          5,
        ),
      )
    }
  }

  return (
    <div>
      {!user ? (
        <>
          <h2> Log in to application</h2>
          <Notification />
          <LoginForm
            handleChange={handleChange}
            userData={userData}
            handleLogin={handleLogin}
          />
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
                setUser(null)
              }}
            >
              logout
            </button>
          </p>
          <Toggleable btnLabel="add blog" ref={blogFormRef}>
            <BlogForm addBlog={addBlog} />
          </Toggleable>

          {blogs.length &&
            blogs
              .map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  handleLikeChange={handleLikeChange}
                  loggedUser={user.username}
                  handleBlogDelete={handleBlogDelete}
                />
              ))
              .sort((a, b) => b.likes - a.likes)}
        </>
      )}
    </div>
  )
}

export default App
