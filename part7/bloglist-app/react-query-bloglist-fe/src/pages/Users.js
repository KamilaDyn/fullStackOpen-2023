import { useGetUsers } from '../hooks'
import { Link } from 'react-router-dom'
const Users = () => {
  const { status, users } = useGetUsers()
  if (status === 'loading') {
    return <p>loading</p>
  }
  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blog created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ id, blogs, name }) => (
            <tr key={id}>
              <td>
                <Link to={`/users/${id}`}>{name}</Link>
              </td>
              <td>{blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Users
