import { Card, Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import { useAddNewUser } from '../hooks'
import { Header, Notification } from '../components'
import { useNavigate } from 'react-router-dom'

const styles = {
  card: {
    width: '80%',
    maxWidth: '750px',
  },
}
const SignUp = () => {
  const navigate = useNavigate()
  const [validated, setValidated] = useState(false)
  const [user, setUser] = useState({
    username: '',
    name: '',
    password: '',
  })

  const newUserMutation = useAddNewUser()
  const handleLogin = async (event) => {
    event.preventDefault()
    const form = event.currentTarget

    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    setValidated(true)
    if (user.name && user.username) {
      newUserMutation.mutate(user)
    }
  }
  const handleChange = ({ target }) => {
    const { name, value } = target
    setUser((prevValue) => ({ ...prevValue, [name]: value }))
  }
  return (
    <div className="container mt-5">
      <Header> Register new user</Header>
      <Notification />
      <Card body className="container" style={styles.card}>
        {' '}
        <Form noValidate validated={validated} onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              minLength={3}
              id="username"
              type="text"
              value={user.username}
              onChange={handleChange}
              name="username"
              placeholder="Enter username"
            />
            <Form.Control.Feedback type="invalid">
              Please write username, min 3 letters
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              minLength={3}
              id="name"
              type="text"
              value={user.name}
              onChange={handleChange}
              name="name"
              placeholder="Enter name"
            />
            <Form.Control.Feedback type="invalid">
              Please write name, min 3 letters
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
              value={user.password}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter password{' '}
            </Form.Control.Feedback>
          </Form.Group>
          <Button id="login" variant="primary" type="submit">
            Register
          </Button>
        </Form>
        <hr />
        <div className="d-flex align-items-center">
          Do you have account?
          <Button variant="text" onClick={() => navigate('/login')}>
            {' '}
            login
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default SignUp
