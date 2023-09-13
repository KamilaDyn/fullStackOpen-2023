import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducers'

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
})
