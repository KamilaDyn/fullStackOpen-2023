import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useUserDispatch } from './context/UserContext'
import Home from './pages/Home'
import Users from './pages/Users'
import { Header } from './components'
import SingleUser from './pages/SingleUser'

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
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<SingleUser />} />
      </Routes>
    </Router>
  )
}

export default App
