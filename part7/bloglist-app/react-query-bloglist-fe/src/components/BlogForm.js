import { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createBlog } from '../services/blogs'
import { useNotification } from '../context/NotificationContext'
import { Button, Card, Form } from 'react-bootstrap'

const initialBlog = {
  title: '',
  author: '',
  url: '',
}
const cardStyle = {
  maxWidth: '750px',
}
const BlogForm = ({ blogFormRef }) => {
  const [blogData, setBlogData] = useState(initialBlog)
  const [validated, setValidated] = useState(false)
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

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }

    setValidated(true)

    if (blogData.author && blogData.title && blogData.url) {
      newBlogMutation.mutate({ ...blogData })
      blogFormRef.current.toggleVisibility()
      setBlogData(initialBlog)
    }
  }
  return (
    <Card className="mb-3 w-100" style={cardStyle}>
      <Card.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              minLength={5}
              id="title"
              placeholder="Title"
              value={title}
              name="title"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please write a title, min 3 letters
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Author</Form.Label>
            <Form.Control
              required
              id="author"
              type="text"
              value={author}
              name="author"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please write author
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Url</Form.Label>
            <Form.Control
              required
              id="url"
              type="text"
              value={url}
              name="url"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please write blog url
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" id="create">
            Create
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

BlogForm.propTypes = {
  blogFormRef: PropTypes.object.isRequired,
}
export default BlogForm
