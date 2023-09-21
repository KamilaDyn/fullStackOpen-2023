import { useState } from 'react'
import { useAddComment } from '../hooks'
import { useParams } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

const CommentForm = () => {
  const [comment, setComment] = useState('')
  const [validated, setValidated] = useState(false)

  const { id } = useParams()
  const newCommentMutation = useAddComment()
  const handleSubmit = (event) => {
    event.preventDefault()
    const newComment = {
      id: id,
      comment: comment,
    }
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }

    setValidated(true)
    if (comment.length > 10) {
      newCommentMutation.mutate(newComment)
      setComment('')
    }
  }

  const handleChange = (e) => {
    setComment(e.target.value)
  }

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      className="d-flex align-items-center"
    >
      <Form.Group className="mx-3 w-50">
        <Form.Control
          required
          minLength={10}
          as="textarea"
          aria-label="With textarea"
          placeholder="Write a comment"
          value={comment}
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">
          Add comment min 10 letters.
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit">Add Comment</Button>
    </Form>
  )
}

export default CommentForm
