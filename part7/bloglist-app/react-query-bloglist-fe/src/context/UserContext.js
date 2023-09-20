import { createContext, useReducer, useContext } from 'react'
import { login } from '../services/login'
import { setToken } from '../storage'
import { useNotification } from './NotificationContext'
import { useNavigate } from 'react-router-dom'

export const UserContext = createContext()

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return action.payload
    case 'LOGGED_USER':
      return action.payload
    case 'LOG_OUT':
      return null
    default:
      return state
  }
}

export const UserContextProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(userReducer, null)

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserDispatch = () => {
  const userDispatch = useContext(UserContext)
  return userDispatch[1]
}

export const useUserValue = () => {
  const userDispatch = useContext(UserContext)
  return userDispatch[0]
}

export const useLoginUser = () => {
  const dispatch = useUserDispatch()
  const setNotification = useNotification()
  const navigate = useNavigate()
  const setUser = (userData) => {
    login(userData)
      .then((response) => {
        setToken(response)
        dispatch({ type: 'LOGIN_USER', payload: response })
        navigate('/')
      })
      .catch(() =>
        setNotification(
          { type: 'error', text: 'Wrong username or password' },
          5,
        ),
      )
  }
  return setUser
}
