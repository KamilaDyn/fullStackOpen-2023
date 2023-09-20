import { useState } from 'react'
import { useAddComment } from '../hooks'
import { useParams } from 'react-router-dom'
import { useNotification } from '../context/NotificationContext'

const CommentForm = () => {
  const [comment, setComment] = useState('')
  const setNotification = useNotification()
  const { id } = useParams()
  const newCommentMutation = useAddComment()
  const handleSubmit = (event) => {
    event.preventDefault()
    const newComment = {
      id: id,
      comment: comment,
    }
    if (comment.length > 3) {
      newCommentMutation.mutate(newComment)
      setComment('')
    } else {
      setNotification(
        {
          type: 'error',
          text: 'Comment must be length min 3 letters',
        },
        5,
      )
    }
  }

  const handleChange = (e) => {
    setComment(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={comment} onChange={handleChange} />{' '}
      <button type="submit">Add Comment</button>{' '}
    </form>
  )
}

export default CommentForm
