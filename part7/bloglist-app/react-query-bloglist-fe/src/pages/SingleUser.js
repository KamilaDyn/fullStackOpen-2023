import { useParams } from 'react-router-dom'
import { useGetUsers } from '../hooks'
const SingleUser = () => {
  const { status, users } = useGetUsers()

  const userId = useParams().id
  const user = users && users.find(({ id }) => id === userId)

  if (status === 'loading') {
    return <p>loading</p>
  }
  if (!user) {
    return null
  }
  return (
    <>
      <h2>{user.name}</h2>
      <p>added blogs</p>
      {user.blogs && user.blogs.length ? (
        <ul>
          {user.blogs.map(({ id, title }) => (
            <li key={id}>{title}</li>
          ))}
        </ul>
      ) : (
        <p>no blogs added by user.</p>
      )}
    </>
  )
}

export default SingleUser
