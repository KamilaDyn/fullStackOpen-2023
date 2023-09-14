import PropTypes from 'prop-types'
import { useLoginUser } from '../context/UserContext'

const LoginForm = ({ setUserData, userData }) => {
  const setUser = useLoginUser()
  const handleChange = ({ target }) => {
    const { name, value } = target
    setUserData((prevData) => ({ ...prevData, [name]: value }))
  }
  const handleLogin = (event) => {
    event.preventDefault()
    setUser(userData)
  }
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={userData.username}
          name="username"
          onChange={handleChange}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={userData.password}
          name="password"
          onChange={handleChange}
        />
      </div>
      <button id="login" type="submit">
        login
      </button>
    </form>
  )
}

LoginForm.propTypes = {
  userData: PropTypes.object.isRequired,
  setUserData: PropTypes.func.isRequired,
}
export default LoginForm
