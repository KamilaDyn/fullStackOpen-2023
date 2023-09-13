import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setLoginUser } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducers'

const LoginForm = ({ setUserData, userData }) => {
  const dispatch = useDispatch()
  const handleChange = ({ target }) => {
    const { name, value } = target
    setUserData((prevData) => ({ ...prevData, [name]: value }))
  }
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      dispatch(setLoginUser(userData))
      setUserData({ username: '', password: '' })
    } catch (exception) {
      dispatch(
        setNotification(
          { type: 'error', text: 'Wrong username or password' },
          5,
        ),
      )
      setTimeout(() => {
        setNotification(null)
      }, 5)
    }
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
