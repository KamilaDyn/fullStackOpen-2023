import { useGetComments } from '../hooks'
import CommentForm from './CommentForm'
import Header from './Header'
import { ListGroup } from 'react-bootstrap'
import { Loading, Notification } from '../components'

const Comments = () => {
  const { comments, status } = useGetComments()

  return (
    <div className="container">
      <Header>Comments</Header>
      <Notification />

      <CommentForm />
      <div className="container mt-5">
        {status === 'loading' ? (
          <Loading />
        ) : comments && comments.length ? (
          <ListGroup as="ul">
            {comments.map(({ id, comment }) => (
              <ListGroup.Item as="li" key={id}>
                {comment}
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p className="h4 text-danger">No comments</p>
        )}
      </div>
    </div>
  )
}

export default Comments
