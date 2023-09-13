import { createSlice } from '@reduxjs/toolkit'
import { login } from '../services/login'
import { setToken } from '../storage'

const initialState = null

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loggedUser(state, action) {
      return action.payload
    },
    loginUser(state, action) {
      return action.payload
    },
  },
})

const { loggedUser, loginUser } = loginSlice.actions

export const setLoggedUser = (userData) => {
  return async (dispatch) => {
    dispatch(loggedUser(userData))
  }
}

export const setLoginUser = (userData) => {
  return async (dispatch) => {
    const user = await login(userData)
    console.log(userData, user)
    setToken(user)
    dispatch(loginUser(user))
  }
}

export default loginSlice.reducer
