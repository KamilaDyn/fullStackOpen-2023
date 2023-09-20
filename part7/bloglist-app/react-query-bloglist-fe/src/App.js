import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useUserDispatch } from './context/UserContext'
import Home from './pages/Home'
import Users from './pages/Users'
import SingleUser from './pages/SingleUser'
import Blog from './pages/Blog'
import ProtectedRoute from './components/ProtectRoute'
import Login from './pages/Login'

const App = () => {
  const dispatch = useUserDispatch()
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const userJson = JSON.parse(loggedUserJSON)
      dispatch({ type: 'LOGGED_USER', payload: userJson })
    }
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/:id"
          element={
            <ProtectedRoute>
              <SingleUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <ProtectedRoute>
              <Blog />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
