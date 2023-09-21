import { useParams, Link } from 'react-router-dom'
import { useGetUsers } from '../hooks'
import { Header, Loading } from '../components'
import { ListGroup } from 'react-bootstrap'
const SingleUser = () => {
  const { status, users } = useGetUsers()

  const userId = useParams().id
  const user = users && users.find(({ id }) => id === userId)

  if (status === 'loading') {
    return <Loading />
  }
  if (!user) {
    return null
  }
  return (
    <div className="container">
      <Header>User name: {user.name}</Header>
      {user.blogs && user.blogs.length ? (
        <>
          <p className="h4 text-success">Added blogs</p>
          <ListGroup as="ol" numbered>
            {user.blogs.map(({ id, title }) => (
              <ListGroup.Item as="li" key={id}>
                <Link to={`/blogs/${id}`}>{title}</Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      ) : (
        <p className="h4 text-danger">No blogs added by user</p>
      )}
    </div>
  )
}

export default SingleUser
