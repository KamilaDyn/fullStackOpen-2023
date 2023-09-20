import { Navigate } from 'react-router-dom'
import { useUserDispatch } from '../context/UserContext'
import { useEffect } from 'react'
import Menu from './Menu'
const ProtectedRoute = ({ children }) => {
  const dispatch = useUserDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const userJson = JSON.parse(loggedUserJSON)
      dispatch({ type: 'LOGGED_USER', payload: userJson })
    } else {
      return <Navigate to="/login" />
    }
  }, [])
  return (
    <>
      <Menu />
      {children}
    </>
  )
}
export default ProtectedRoute
