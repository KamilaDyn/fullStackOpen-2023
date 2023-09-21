import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useUserValue, useUserDispatch } from '../context/UserContext'
import { removeToken } from '../storage'

const Menu = () => {
  const user = useUserValue()
  const dispatch = useUserDispatch()
  const navigate = useNavigate()

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Text className="h3 mr-3 text-white">
          Blog App - Helsinki Full stack course 2023
        </Navbar.Text>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" to="/">
              Blogs
            </Link>
            <Link className="nav-link" to="/users">
              Users
            </Link>{' '}
          </Nav>
          <div>
            <Navbar.Text className="mr-3">
              {user && `Signed in as: ${user.username}`}
            </Navbar.Text>
            <button
              onClick={() => {
                removeToken()
                dispatch({ type: 'LOG_OUT' })
                navigate('/login')
              }}
            >
              <i className="bi bi-door-open text-white "></i>
            </button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Menu
