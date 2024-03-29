import { useState } from 'react'
import PropTypes from 'prop-types'
import { createNewBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducers'

const initialBlog = {
  title: '',
  author: '',
  url: '',
}
const BlogForm = ({ blogFormRef }) => {
  const [blogData, setBlogData] = useState(initialBlog)
  const dispatch = useDispatch()
  const { title, author, url } = blogData
  const handleChange = (event) => {
    const { name, value } = event.target
    setBlogData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (blogData.author && blogData.title && blogData.url) {
      dispatch(setNotification(null))
      blogFormRef.current.toggleVisibility()
      dispatch(createNewBlog(blogData))
      setBlogData(initialBlog)
    } else {
      dispatch(setNotification({ type: 'error', text: 'fill all fields' }, 5))
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        Title
        <input
          id="title"
          type="text"
          value={title}
          name="title"
          onChange={handleChange}
        />
      </div>
      <div>
        author
        <input
          id="author"
          type="text"
          value={author}
          name="author"
          onChange={handleChange}
        />
      </div>
      <div>
        url
        <input
          id="url"
          type="text"
          value={url}
          name="url"
          onChange={handleChange}
        />
      </div>
      <button id="create" type="submit">
        create
      </button>
    </form>
  )
}

BlogForm.propTypes = {
  blogFormRef: PropTypes.object.isRequired,
}
export default BlogForm
