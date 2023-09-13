import { useState } from 'react'
import PropTypes from 'prop-types'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 'solid',
  marginBottom: 5,
}

const Blog = ({ blog }) => {
  const { title, author, likes, url, user } = blog

  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => {
    setVisible((prevValue) => !prevValue)
  }
  // console.log(blog, loggedUser)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const handleBlogDelete = async (blog) => {
    // if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
    //   dispatch(removeSingleBlog(blog.id))
    //   dispatch(
    //     setNotification(
    //       {
    //         type: 'notification',
    //         text: `Success, a blog ${blog.title} was removed.`,
    //       },
    //       5,
    //     ),
    //   )
    // }
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
          <button name="like" onClick={() => console.log('ok')}>
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
