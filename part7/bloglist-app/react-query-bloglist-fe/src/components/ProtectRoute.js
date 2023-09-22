import { Navigate } from 'react-router-dom'
import { useUserDispatch, useUserValue } from '../context/UserContext'
import { useEffect } from 'react'
import Menu from './Menu'
const ProtectedRoute = ({ children }) => {
  const dispatch = useUserDispatch()
  const user = useUserValue()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const userJson = JSON.parse(loggedUserJSON)
      dispatch({ type: 'LOGGED_USER', payload: userJson })
    }
  }, [])
  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <>
      <Menu />
      {children}
    </>
  )
}
export default ProtectedRoute
