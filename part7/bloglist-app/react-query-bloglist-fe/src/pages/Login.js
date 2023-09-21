import { useState } from 'react'
import { Notification, LoginForm } from '../components'
import { useUserValue } from '../context/UserContext'
import { Navigate } from 'react-router-dom'

const Login = () => {
  const [userData, setUserData] = useState({ username: '', password: '' })
  const user = useUserValue()
  if (user) {
    return <Navigate to="/" />
  }
  return (
    <div className="d-flex flex-column align-items-center justify-content-center  w-100 vh-100">
      <p className="h2 text-primary"> Log in to application</p>
      <div>Example login data: Kami01 test123</div>
      <Notification />
      <LoginForm userData={userData} setUserData={setUserData} />
    </div>
  )
}

export default Login
