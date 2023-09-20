import { useGetComments } from '../hooks'
import CommentForm from './CommentForm'

const Comments = () => {
  const { comments } = useGetComments()

  return (
    <div>
      <h2>Comments</h2>
      <CommentForm />
      {comments && comments.length ? (
        <ul>
          {comments.map(({ id, comment }) => (
            <li key={id}>{comment}</li>
          ))}
        </ul>
      ) : (
        <p>no comments</p>
      )}
    </div>
  )
}

export default Comments
