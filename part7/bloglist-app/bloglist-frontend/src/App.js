import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import { removeToken } from './storage'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'
import { updateBlog, deleteBlog } from './services/blogs'
import { setNotification } from './reducers/notificationReducers'
import { createNewBlog, setBlogs } from './reducers/blogReducer'
import { setLoggedUser, setLoginUser } from './reducers/loginReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const [userData, setUserData] = useState({ username: '', password: '' })
  const blogFormRef = useRef()

  const handleChange = ({ target }) => {
    const { name, value } = target
    setUserData((prevData) => ({ ...prevData, [name]: value }))
  }
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      dispatch(setLoginUser(userData))
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

  const addBlog = async (blogObject) => {
    try {
      dispatch(createNewBlog(blogObject))
      blogFormRef.current.toggleVisibility()
      dispatch(
        setNotification(
          {
            type: 'notification',
            text: `Success, a new blog ${blogObject.title} by ${blogObject.author} added.`,
          },
          5,
        ),
      )
      dispatch(setBlogs())
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
      // setBlogs((currentBlogs) =>
      //   currentBlogs.filter((currentBlog) => currentBlog.id !== blog.id),
      // )
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
          <div>Example login data: Kami01 test123</div>
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
                dispatch(setLoggedUser(null))
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
