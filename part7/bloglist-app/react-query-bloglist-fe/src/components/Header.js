import { Notification, LoginForm } from '../components'
import { useUserDispatch, useUserValue } from '../context/UserContext'
import { removeToken } from '../storage'
import { useState } from 'react'
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
      <h2>blogs</h2>
      <Notification />
      <p>
        User {user.username} is logged in. You can{' '}
        <button
          onClick={() => {
            removeToken()
            dispatch({ type: 'LOG_OUT' })
          }}
        >
          logout
        </button>
      </p>
    </>
  )
}

export default Header
