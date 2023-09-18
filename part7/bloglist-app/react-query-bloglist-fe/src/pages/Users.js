import { useQuery } from '@tanstack/react-query'
import { getAllUsers } from '../services/users'

const Users = () => {
  const { status, data: users } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
    retry: 1,
  })

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
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Users
