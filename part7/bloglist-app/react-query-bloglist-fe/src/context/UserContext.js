import { createContext, useReducer, useContext } from 'react'
import { login } from '../services/login'
import { setToken } from '../storage'

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

  //   const value = {
  //     user: user.user,
  //   }
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
  const setUser = async (userData) => {
    const user = await login(userData)
    setToken(user)
    dispatch({ type: 'LOGIN_USER', payload: user })
  }
  return setUser
}
