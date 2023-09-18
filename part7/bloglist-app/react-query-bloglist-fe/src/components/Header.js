import { Notification, LoginForm } from '../components'
import { useUserDispatch, useUserValue } from '../context/UserContext'
import { removeToken } from '../storage'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const styles = {
  padding: {
    paddingRight: 5,
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
}
const Menu = () => {
  return (
    <div>
      <Link style={styles.padding} to="/">
        Blogs
      </Link>
      <Link style={styles.padding} to="/users">
        Users
      </Link>
    </div>
  )
}

const Header = () => {
  const dispatch = useUserDispatch()
  const [userData, setUserData] = useState({ username: '', password: '' })
  const user = useUserValue()
  if (!user) {
    return (
      <>
        <h2> Log in to application</h2>
        <div>Example login data: Kami01 test123</div>
        <Notification />
        <LoginForm userData={userData} setUserData={setUserData} />
      </>
    )
  }

  return (
    <>
      <div style={styles.flex}>
        <Menu />

        <p> {user.username} logged in.</p>
        <button
          onClick={() => {
            removeToken()
            dispatch({ type: 'LOG_OUT' })
          }}
        >
          logout
        </button>
      </div>
      <h2>blogs</h2>
      <Notification />
    </>
  )
}

export default Header
