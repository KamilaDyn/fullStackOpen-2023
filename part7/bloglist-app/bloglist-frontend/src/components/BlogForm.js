import { useState } from 'react'
import PropTypes from 'prop-types'

const initialBlog = {
  title: '',
  author: '',
  url: '',
}
const BlogForm = ({ addBlog }) => {
  const [blogData, setBlogData] = useState(initialBlog)

  const { title, author, url } = blogData
  const handleChange = (event) => {
    const { name, value } = event.target
    setBlogData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addBlog(blogData)
      setBlogData(initialBlog)
    } catch (err) {
      console.error(err)
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
  addBlog: PropTypes.func.isRequired,
}
export default BlogForm
