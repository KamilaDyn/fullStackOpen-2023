import { createContext, useContext, useReducer } from 'react'

export const NotificationContext = createContext()

const useNotificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.payload
    case 'HIDE_NOTIFICATION':
      return null
    default:
      state
  }
}

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(
    useNotificationReducer,
    null,
  )
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationDispatch = () => {
  const notificationDispatch = useContext(NotificationContext)
  return notificationDispatch[1]
}

export const useNotificationValue = () => {
  const notificationValue = useContext(NotificationContext)
  return notificationValue[0]
}

export const useNotification = () => {
  const dispatch = useNotificationDispatch()
  const setNotification = (message, duration) => {
    dispatch({ type: 'SHOW_NOTIFICATION', payload: message })
    setTimeout(() => {
      dispatch({ type: 'HIDE_NOTIFICATION' })
    }, 1000 * duration)
  }

  return setNotification
}
