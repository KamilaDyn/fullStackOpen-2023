import { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteBlog, updateBlog } from '../services/blogs'
import { useNotification } from '../context/NotificationContext'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 'solid',
  marginBottom: 5,
}

const Blog = ({ blog }) => {
  const { title, author, likes, url, user } = blog
  const queryClient = useQueryClient()
  const setNotification = useNotification()
  const updateBlogLike = useMutation(updateBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })
  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => {
    setVisible((prevValue) => !prevValue)
  }

  const deleteBlogMutation = useMutation(deleteBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setNotification({ type: 'notification', text: 'Blog was deleted' }, 5)
    },
    onError: () => {
      setNotification(
        { type: 'error', text: 'Could not delete blog, please try later' },
        5,
      )
    },
  })
  const showWhenVisible = { display: visible ? '' : 'none' }
  const handleBlogDelete = async (blog) => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      deleteBlogMutation.mutate(blog.id)
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
          <button name="like" onClick={() => updateBlogLike.mutate(blog)}>
            like
          </button>
        </p>
        {user && (
          <p>
            Added by: <span>{user.name}</span>
          </p>
        )}
        {user && user.name && (
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
