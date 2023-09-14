import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { removeSingleBlog, updateLikeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducers'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 'solid',
  marginBottom: 5,
}

const Blog = ({ blog }) => {
  const { title, author, likes, url, user } = blog
  const dispatch = useDispatch()
  const loggedUser = useSelector((state) => state.user)
  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => {
    setVisible((prevValue) => !prevValue)
  }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const handleBlogDelete = async (blog) => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      dispatch(removeSingleBlog(blog.id))
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
    <div className="blog" style={blogStyle}>
      <div>
        {title} {author}{' '}
        <button className="viewBtn" onClick={toggleVisibility}>
          {!visible ? 'view' : 'hide'}
        </button>
      </div>
      <div style={showWhenVisible}>
        <a href={url}>{url}</a>
        <p>
          likes: <span>{likes} </span>
          <button name="like" onClick={() => dispatch(updateLikeBlog(blog))}>
            like
          </button>
        </p>
        {user && (
          <p>
            Added by: <span>{user.name}</span>
          </p>
        )}
        {user && user.name === loggedUser.name && (
          <button
            id="delete"
            style={{ backgroundColor: 'red' }}
            onClick={() => handleBlogDelete(blog)}
          >
            Remove
          </button>
        )}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
