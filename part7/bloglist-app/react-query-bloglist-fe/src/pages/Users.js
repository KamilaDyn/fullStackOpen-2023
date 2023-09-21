import { Header, Loading } from '../components'
import { useGetUsers } from '../hooks'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
const styles = {
  wrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  table: {
    maxWidth: '750px',
  },
}

const Users = () => {
  const { status, users } = useGetUsers()
  if (status === 'loading') {
    return <Loading />
  }
  return (
    <div>
      <Header>Users</Header>
      <div style={styles.wrapper}>
        <Table striped bordered hover style={styles.table}>
          <thead>
            <tr>
              <th></th>
              <th>Blogs created</th>
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
        </Table>
      </div>
    </div>
  )
}

export default Users
