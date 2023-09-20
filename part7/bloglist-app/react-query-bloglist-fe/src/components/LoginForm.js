import PropTypes from 'prop-types'
import { useLoginUser } from '../context/UserContext'
import { Button, Card, Form } from 'react-bootstrap'
import { useState } from 'react'

const styles = {
  card: {
    width: '80%',
    maxWidth: '750px',
  },
}

const LoginForm = ({ setUserData, userData }) => {
  const setUser = useLoginUser()
  const [validated, setValidated] = useState(false)

  const handleChange = ({ target }) => {
    const { name, value } = target
    setUserData((prevData) => ({ ...prevData, [name]: value }))
  }
  const handleLogin = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    setValidated(true)
    if (userData.username && userData.password) {
      setUser(userData)
    }
  }
  return (
    <Card body style={styles.card}>
      {' '}
      <Form noValidate validated={validated} onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            minLength={3}
            id="username"
            type="text"
            value={userData.username}
            onChange={handleChange}
            name="username"
            placeholder="Enter username"
          />
          <Form.Control.Feedback type="invalid">
            Please write username, min 3 letters
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            name="password"
            id="password"
            type="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please enter password{' '}
          </Form.Control.Feedback>
        </Form.Group>
        <Button id="login" variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Card>
  )
}

LoginForm.propTypes = {
  userData: PropTypes.object.isRequired,
  setUserData: PropTypes.func.isRequired,
}
export default LoginForm
