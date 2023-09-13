import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'nofitication',
  initialState,
  reducers: {
    newNotification(state, action) {
      return action.payload
    },
    hideNotification() {
      return null
    },
  },
})

const { newNotification, hideNotification } = notificationSlice.actions

export const setNotification = (content, duration) => {
  return (dispatch) => {
    dispatch(newNotification(content))
    setTimeout(() => {
      dispatch(hideNotification())
    }, duration * 1000)
  }
}

export default notificationSlice.reducer
