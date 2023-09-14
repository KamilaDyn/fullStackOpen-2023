import { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createBlog } from '../services/blogs'
import { useNotification } from '../context/NotificationContext'

const initialBlog = {
  title: '',
  author: '',
  url: '',
}
const BlogForm = ({ blogFormRef }) => {
  const [blogData, setBlogData] = useState(initialBlog)
  const queryClient = useQueryClient()
  const setNotification = useNotification()

  const { title, author, url } = blogData
  const handleChange = (event) => {
    const { name, value } = event.target
    setBlogData((prevData) => ({ ...prevData, [name]: value }))
  }
  const newBlogMutation = useMutation(createBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
    onError: () => {
      setNotification(
        {
          type: 'error',
          text: 'could not add blog, please try later',
        },
        5,
      )
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (blogData.author && blogData.title && blogData.url) {
      newBlogMutation.mutate({ ...blogData })
      blogFormRef.current.toggleVisibility()
      setBlogData(initialBlog)
    } else {
      setNotification({ type: 'error', text: 'fill all fields' }, 5)
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
