import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, handleChange, userData }) => {
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
  handleLogin: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
}
export default LoginForm
